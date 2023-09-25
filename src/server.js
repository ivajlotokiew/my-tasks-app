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
      this.get("/api/tasks", (schema, { queryParams }) => {
        const { search } = queryParams;

        if (search) {
          return schema.tasks.where((task) => task.title.includes(search));
        }

        return schema.tasks.all();
      });

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.tasks.create(attrs);
      });

      this.patch("/api/tasks/:id", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);

        return schema.tasks.find(request.params.id).update(attrs);
      });

      this.delete("/api/tasks", (schema) => {
        this.db.tasks.remove();
        return schema.tasks.all();
      });

      this.delete("/api/tasks/:id", (schema, { params }) => {
        const { id } = params;
        schema.tasks.find(id).destroy();

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
