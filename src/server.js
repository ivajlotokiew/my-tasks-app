import { createServer, Model, hasMany, belongsTo } from "miragejs";
import { tasks } from "./backend/models/task-data";
import { formatDate } from "./components/utils/utils";

export function makeServer() {
  const server = createServer({
    models: {
      directory: Model.extend({
        tasks: hasMany(),
      }),

      task: Model.extend({
        directory: belongsTo(),
      }),
    },
    fixtures: {
      tasks,
    },
    seeds(server) {
      let mainDirectory = server.create("directory", { title: "Main" });

      tasks.forEach((task) =>
        server.create("task", { ...task, directory: mainDirectory })
      );
    },
    routes() {
      const getAllTasks = () => {
        return this.db.tasks;
      };

      const getCompletedTasks = () => {
        return this.db.tasks.where((task) => task.completed);
      };

      const getTodaysTasks = () => {
        return this.db.tasks.where(
          (task) => task.date === formatDate(new Date())
        );
      };

      const getTodaysCompletedTasks = () => {
        return this.db.tasks.where(
          (task) => task.date === formatDate(new Date()) && task.completed
        );
      };

      this.get("/api/tasks", (schema, { queryParams }) => {
        const { search } = queryParams;
        const { important } = queryParams;
        const { today } = queryParams;
        let { completed } = queryParams;
        let { uncompleted } = queryParams;
        let tasks;

        if (important) {
          tasks = schema.tasks.where((task) => task.important).models;
        }

        if (completed !== undefined) {
          tasks = schema.tasks.where((task) => task.completed).models;
        }

        if (uncompleted !== undefined) {
          tasks = schema.tasks.where((task) => !task.completed).models;
        }

        if (today) {
          tasks = schema.tasks.where(
            (task) => task.date === formatDate(new Date())
          ).models;
        }

        if (search) {
          tasks = schema.tasks.where((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          ).models;
        }

        return { tasks: tasks || schema.tasks.all().models };
      });

      this.get("/api/todayTasks", (schema) => {
        const tasks = schema.tasks.where(
          (task) => task.date === formatDate(new Date())
        ).models;

        return { tasks };
      });

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        const task = schema.tasks.create(attrs);
        const allTasksCount = getAllTasks().length;
        const todaysTasksCount = getTodaysTasks().length;
        const todaysCompletedTasksCount = getTodaysCompletedTasks().length;
        const completedTasksCount = getCompletedTasks().length;

        return {
          task,
          allTasksCount,
          todaysTasksCount,
          todaysCompletedTasksCount,
          completedTasksCount,
        };
      });

      this.patch("/api/tasks/:id", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);
        const task = schema.tasks.find(request.params.id).update(attrs);
        const todaysTasksCount = getTodaysTasks().length;
        const todaysCompletedTasksCount = getTodaysCompletedTasks().length;
        const completedTasksCount = getCompletedTasks().length;

        return {
          task,
          todaysTasksCount,
          completedTasksCount,
          todaysCompletedTasksCount,
        };
      });

      this.delete("/api/tasks", (schema) => {
        this.db.tasks.remove();
        return { tasks: schema.tasks.all().models, count: 0 };
      });

      this.delete("/api/tasks/:id", (schema, { params }) => {
        const { id } = params;
        schema.tasks.find(id).destroy();
        const tasks = schema.tasks.all().models;
        const allTasksCount = getAllTasks().length;
        const todaysTasksCount = getTodaysTasks().length;
        const todaysCompletedTasksCount = getTodaysCompletedTasks().length;
        const completedTasksCount = getCompletedTasks().length;

        return {
          tasks,
          allTasksCount,
          todaysTasksCount,
          completedTasksCount,
          todaysCompletedTasksCount,
        };
      });

      this.get("/api/directories", (schema) => {
        return schema.directories.all();
      });

      this.post("/api/directories", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.directories.create(attrs);
      });

      this.patch("/api/directories/:id", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);
        const directory = schema.directories
          .find(request.params.id)
          .update(attrs);

        return directory;
      });

      this.delete("/api/directories", (schema) => {
        this.db.directories.remove();
        return schema.directories.all();
      });

      this.delete("/api/directories/:id", (schema, { params }) => {
        const { id } = params;
        const directory = schema.directories.find(id);
        directory.tasks.destroy();
        directory.destroy();

        return schema.directories.all();
      });

      this.get("/api/directories/:id/tasks", (schema, request) => {
        let directoryId = request.params.id;
        let directory = schema.directories.find(directoryId);

        return directory.tasks.models;
      });

      this.get("/api/tasks/:id/directory", (schema, request) => {
        let taskId = request.params.id;
        let task = schema.tasks.find(taskId);

        return task.directory;
      });

      this.get("/api/user/me", () => {
        const allTasksCount = getAllTasks().length;
        const todaysTasksCount = getTodaysTasks().length;
        const todaysCompletedTasksCount = getTodaysCompletedTasks().length;
        const completedTasksCount = getCompletedTasks().length;
        const user = {
          id: 1,
          name: "Ivaylo Tokiev",
          imgURL: "img_avatar.png",
        };

        return {
          user,
          allTasksCount,
          todaysTasksCount,
          completedTasksCount,
          todaysCompletedTasksCount,
        };
      });
    },
  });

  return server;
}
