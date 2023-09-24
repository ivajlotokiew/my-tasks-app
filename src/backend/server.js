import { createServer, Model, hasMany, belongsTo } from "miragejs";
import { tasks } from "./models/task-data";

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
    routes() {
      this.get("/api/tasks", (schema) => {
        return schema.tasks.all();
      });
    },
  });
  return server;
}
