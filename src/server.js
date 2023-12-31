import { createServer, Model, hasMany, belongsTo, Response } from "miragejs";
import { tasks } from "./backend/models/task-data";
import { users } from "./backend/models/users-data";
import { formatDate } from "./components/utils/utils";
import { requiresAuth } from "./backend/utils/authUtil";
import { getUserTasks } from "./backend/helpers/tasksHelper";

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend({
        directories: hasMany(),
      }),

      directory: Model.extend({
        user: belongsTo(),
        tasks: hasMany(),
      }),

      task: Model.extend({
        directory: belongsTo(),
      }),
    },
    fixtures: {
      tasks,
      users,
    },
    seeds(server) {
      users.forEach((user) => {
        let mainDirectory = server.create("directory", {
          title: "Main",
        });
        server.create("user", { ...user, directories: [mainDirectory] });
      });

      const mainUser = server.schema.users.first();
      const directory = mainUser.directories.models[0];

      tasks.forEach((task) => server.create("task", { ...task, directory }));
    },
    routes() {
      this.post("/api/auth/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        try {
          const foundUser = schema.users.findBy({ username });
          if (!foundUser) {
            return new Response(
              404,
              {},
              {
                errors: [
                  "The username you entered is not Registered. Not Found error",
                ],
              }
            );
          }
          if (password === foundUser.password) {
            const jwt = require("jsonwebtoken");
            const encodedToken = jwt.sign(
              { id: foundUser.id, username },
              `${username}_([])_${password}`
            );

            return new Response(200, {}, { foundUser, encodedToken });
          }

          return new Response(
            401,
            {},
            {
              errors: [
                "The credentials you entered are invalid. Unauthorized access error.",
              ],
            }
          );
        } catch (error) {
          return new Response(
            500,
            {},
            {
              error,
            }
          );
        }
      });

      this.get("/api/tasks", (_, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }

        const nFunc = getUserTasks.bind(this, user);
        const { allTasks, completedTasks, todayTasks, todayCompletedTasks } =
          nFunc();
        const allTasksCount = allTasks.length;
        const completedTasksCount = completedTasks.length;
        const todaysTasksCount = todayTasks.length;
        const todaysCompletedTasksCount = todayCompletedTasks.length;

        const { search, important, today, completed, uncompleted } =
          request.queryParams;

        let tasks = this.db.tasks.where((task) =>
          user.directoryIds.includes(task.directoryId)
        );

        if (important) {
          tasks = tasks.filter((task) => task.important);
        }

        if (completed !== undefined) {
          tasks = tasks.filter((task) => task.completed);
        }

        if (uncompleted !== undefined) {
          tasks = tasks.filter((task) => !task.completed);
        }

        if (today) {
          tasks = tasks.filter((task) => task.date === formatDate(new Date()));
        }

        if (search) {
          tasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        return new Response(
          200,
          {},
          {
            tasks,
            allTasksCount,
            todaysTasksCount,
            completedTasksCount,
            todaysCompletedTasksCount,
          }
        );
      });

      this.get("/api/todayTasks", (schema) => {
        const tasks = schema.tasks.where(
          (task) => task.date === formatDate(new Date())
        ).models;

        return new Response(
          200,
          {},
          { tasks: tasks || schema.tasks.all().models }
        );
      });

      this.post("/api/tasks", (schema, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }

        let attrs = JSON.parse(request.requestBody);
        let { title } = attrs;

        if (title && title.length < 3) {
          return new Response(
            404,
            {},
            {
              errors: [
                "A title is required and must be at least 3 characters long.",
              ],
            }
          );
        }

        const task = schema.tasks.create(attrs);
        const { allTasks, completedTasks, todayTasks, todayCompletedTasks } =
          getUserTasks.call(this, user);
        const allTasksCount = allTasks.length;
        const completedTasksCount = completedTasks.length;
        const todaysTasksCount = todayTasks.length;
        const todaysCompletedTasksCount = todayCompletedTasks.length;

        return new Response(
          200,
          {},
          {
            task,
            allTasksCount,
            todaysTasksCount,
            todaysCompletedTasksCount,
            completedTasksCount,
          }
        );
      });

      this.get("/api/tasks/:id", (schema, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }

        const task = schema.tasks.find(request.params.id);
        if (!task) {
          return new Response(
            404,
            {},
            {
              errors: ["No such task found."],
            }
          );
        }

        const { completedTasks, todayTasks, todayCompletedTasks } =
          getUserTasks.call(this, user);
        const completedTasksCount = completedTasks.length;
        const todaysTasksCount = todayTasks.length;
        const todaysCompletedTasksCount = todayCompletedTasks.length;

        return new Response(
          200,
          {},
          {
            task,
            todaysTasksCount,
            todaysCompletedTasksCount,
            completedTasksCount,
          }
        );
      });

      this.patch("/api/tasks/:id", (schema, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }

        let attrs = JSON.parse(request.requestBody);
        const task = schema.tasks.find(request.params.id);
        const { title } = attrs;
        if (!task) {
          return new Response(
            404,
            {},
            {
              errors: ["No such task found."],
            }
          );
        }

        if (title && title.length < 3) {
          return new Response(
            404,
            {},
            {
              errors: [
                "A title is required and must be at least 3 characters long.",
              ],
            }
          );
        }

        task.update(attrs);
        const { completedTasks, todayTasks, todayCompletedTasks } =
          getUserTasks.call(this, user);
        const completedTasksCount = completedTasks.length;
        const todaysTasksCount = todayTasks.length;
        const todaysCompletedTasksCount = todayCompletedTasks.length;

        return new Response(
          200,
          {},
          {
            task,
            todaysTasksCount,
            todaysCompletedTasksCount,
            completedTasksCount,
          }
        );
      });

      this.delete("/api/tasks", (schema) => {
        this.db.tasks.remove();
        const tasks = schema.tasks.all().models;
        const count = tasks.length;

        return new Response(200, {}, { tasks, count });
      });

      this.delete("/api/tasks/:id", (schema, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }

        const { id } = request.params;
        const task = schema.tasks.find(id);
        if (!task) {
          return new Response(
            404,
            {},
            {
              errors: ["No such task found."],
            }
          );
        }

        task.destroy();
        const tasks = schema.tasks
          .all()
          .models.filter((task) =>
            user.directoryIds.includes(task.directoryId)
          );
        const { allTasks, completedTasks, todayTasks, todayCompletedTasks } =
          getUserTasks.call(this, user);
        const allTasksCount = allTasks.length;
        const completedTasksCount = completedTasks.length;
        const todaysTasksCount = todayTasks.length;
        const todaysCompletedTasksCount = todayCompletedTasks.length;

        return new Response(
          200,
          {},
          {
            tasks,
            allTasksCount,
            todaysTasksCount,
            todaysCompletedTasksCount,
            completedTasksCount,
          }
        );
      });

      this.get("/api/directories", (_, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }

        const directories = this.db.directories.where((dir) =>
          user.directoryIds.includes(dir.id)
        );
        return new Response(200, {}, { directories });
      });

      this.post("/api/directories", (schema, request) => {
        const user = requiresAuth.call(this, request);
        if (!user) {
          return new Response(
            404,
            {},
            {
              errors: [
                "The username you entered is not Registered. Not Found error",
              ],
            }
          );
        }
        let attrs = JSON.parse(request.requestBody);
        const directory = schema.directories.create({
          ...attrs,
          userId: user.id,
        });

        return new Response(200, {}, { directory });
      });

      this.patch("/api/directories/:id", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);
        const directory = schema.directories.find(request.params.id);
        if (!directory) {
          return new Response(
            404,
            {},
            {
              errors: ["No such directory found."],
            }
          );
        }

        directory.update(attrs);

        return new Response(200, {}, { directory });
      });

      this.delete("/api/directories", (schema) => {
        this.db.directories.remove();
        const directories = schema.directories.all().models;

        return new Response(200, {}, { directories });
      });

      this.delete("/api/directories/:id", (schema, { params }) => {
        const { id } = params;
        const directory = schema.directories.find(id);
        if (!directory) {
          return new Response(
            404,
            {},
            { errors: ["No such directory found."] }
          );
        }
        directory.tasks.destroy();
        directory.destroy();
        const directories = schema.directories.all().models;

        return new Response(200, {}, { directories });
      });

      this.get("/api/directories/:id/tasks", (schema, request) => {
        const directoryId = request.params.id;
        const directory = schema.directories.find(directoryId);
        const tasks = directory.tasks.models;

        return new Response(200, {}, { tasks });
      });

      this.get("/api/tasks/:id/directory", (schema, request) => {
        let taskId = request.params.id;
        let task = schema.tasks.find(taskId);
        let directory = task.directory;

        return new Response(200, {}, { directory });
      });
    },
  });

  return server;
}
