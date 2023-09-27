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

          return { tasks, count };
        }

        if (search) {
          const tasks = schema.tasks.where((task) =>
            task.title.includes(search)
          ).models;

          return { tasks, count };
        }

        if (important) {
          const tasks = schema.tasks.where((task) => task.important).models;
          return { tasks, count };
        }

        if (completed !== undefined) {
          completed = completed === "true" ? true : false;
          const tasks = schema.tasks.where(
            (task) => task.completed === completed
          ).models;

          return { tasks, count };
        }

        return { tasks, count };
      });

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        const task = schema.tasks.create(attrs);
        const count = schema.tasks.all().models.length;

        return { task, count };
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
        const count = tasks.length;
        debugger;
        return { tasks, count };
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
    },
  });

  return server;
}
