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
      let mainDirectory = server.create("directory", { name: "Main" });

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

      this.get("/api/tasks", (schema, { queryParams }) => {
        const { search } = queryParams;
        const { important } = queryParams;
        const { today } = queryParams;
        let { completed } = queryParams;
        const tasks = schema.tasks.all().models;
        const count = tasks.length;

        if (today) {
          const tasks = schema.tasks.where(
            (task) => task.date === formatDate(new Date())
          ).models;

          return { tasks };
        }

        if (search) {
          const tasks = schema.tasks.where((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          ).models;

          return { tasks };
        }

        if (important) {
          const tasks = schema.tasks.where((task) => task.important).models;
          return { tasks };
        }

        if (completed !== undefined) {
          completed = completed === "true" ? true : false;
          const tasks = schema.tasks.where(
            (task) => task.completed === completed
          ).models;

          return { tasks };
        }

        return { tasks };
      });

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        const task = schema.tasks.create(attrs);
        const allTasksCount = getAllTasks().length;
        const todaysTasksCount = getTodaysTasks().length;
        const completedTasksCount = getCompletedTasks().length;

        return { task, allTasksCount, todaysTasksCount, completedTasksCount };
      });

      this.patch("/api/tasks/:id", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);

        return schema.tasks.find(request.params.id).update(attrs);
      });

      this.delete("/api/tasks", (schema) => {
        this.db.tasks.remove();
        return { tasks: schema.tasks.all(), count: 0 };
      });

      this.delete("/api/tasks/:id", (schema, { params }) => {
        const { id } = params;
        schema.tasks.find(id).destroy();
        const tasks = schema.tasks.all().models;
        const allTasksCount = getAllTasks().length;
        const todaysTasksCount = getTodaysTasks().length;
        const completedTasksCount = getCompletedTasks().length;

        return { tasks, allTasksCount, todaysTasksCount, completedTasksCount };
      });

      this.get("/api/directories", (schema) => {
        return schema.directories.all();
      });

      this.get("/api/directories/:id/tasks", (schema, request) => {
        let directoryId = request.params.id;
        let directory = schema.directories.find(directoryId);

        return directory.tasks;
      });

      this.get("/api/tasks/:id/directory", (schema, request) => {
        let taskId = request.params.id;
        let task = schema.tasks.find(taskId);

        return task.directory;
      });

      this.get("/api/user/me", () => {
        const allTasksCount = getAllTasks().length;
        const todaysTasksCount = getTodaysTasks().length;
        const completedTasksCount = getCompletedTasks().length;
        const user = {
          id: 1,
          name: "Ivaylo Tokiev",
          imgURL: "img_avatar.png",
        };

        return { user, allTasksCount, todaysTasksCount, completedTasksCount };
      });
    },
  });

  return server;
}
