import { formatDate } from "../../components/utils/utils";
import { Task } from "../../features/tasks/tasksSlice";

export const tasks: Task[] = [
  {
    id: 1,
    title: "First task",
    description: "Description One",
    date: formatDate(new Date()),
    important: true,
    completed: true,
  },
  {
    id: 2,
    title: "Second task",
    description: "Description Two",
    date: "2023-10-10",
    important: false,
    completed: false,
  },
  {
    id: 3,
    title: "Important task",
    description: "Description Three",
    date: formatDate(new Date()),
    important: true,
    completed: true,
  },
  {
    id: 4,
    title: "Need haircut",
    description: "Description four",
    date: "2023-09-21",
    important: false,
    completed: false,
  },
  {
    id: 5,
    title: "Go movie",
    description: "Description five",
    date: formatDate(new Date()),
    important: true,
    completed: false,
  },
  {
    id: 6,
    title: "Must prepare dinner",
    description: "Description six",
    date: "2023-10-10",
    important: false,
    completed: true,
  },
];
