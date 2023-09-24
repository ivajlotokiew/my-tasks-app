import { formatDate } from "../../components/utils/utils";
import { Task } from "../../features/tasks/tasksSlice";

export const tasks: Task[] = [
  {
    id: 1,
    directoryId: 1,
    title: "First task",
    description: "Description One",
    created: formatDate(new Date()),
    important: true,
    completed: true,
  },
  {
    id: 2,
    directoryId: 1,
    title: "Second task",
    description: "Description Two",
    created: "2023-10-10",
    important: false,
    completed: false,
  },
  {
    id: 3,
    directoryId: 1,
    title: "Important task",
    description: "Description Three",
    created: formatDate(new Date()),
    important: true,
    completed: true,
  },
  {
    id: 4,
    directoryId: 1,
    title: "Need haircut",
    description: "Description four",
    created: "2023-09-21",
    important: false,
    completed: false,
  },
  {
    id: 5,
    directoryId: 1,
    title: "Go movie",
    description: "Description five",
    created: formatDate(new Date()),
    important: true,
    completed: false,
  },
  {
    id: 6,
    directoryId: 1,
    title: "Must prepare dinner",
    description: "Description six",
    created: "2023-10-10",
    important: false,
    completed: true,
  },
];
