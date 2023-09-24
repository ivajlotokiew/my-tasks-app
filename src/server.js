import { createServer, Model, hasMany, belongsTo } from "miragejs";
import { tasks } from "./backend/models/task-data";

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
      this.get("/api/tasks", (schema) => {
        return schema.tasks.all();
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