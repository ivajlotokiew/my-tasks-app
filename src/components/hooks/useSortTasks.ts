import { useState, useEffect } from "react";
import { Task } from "../../features/tasks/tasksSlice";

interface Props {
  tasks: Task[];
}

const useSortTasks = ({ tasks }: Props) => {
  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks);
  const [sortedBy, setSortedBy] = useState<string>("");

  useEffect(() => {
    const sortByDate = (sortedOrder: string): Task[] => {
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((a: Task, b: Task) => {
        const first = Date.parse(a.created);
        const second = Date.parse(b.created);
        if (first > second) return 1;
        if (first < second) return -1;
        return 0;
      });

      if (sortedOrder === "time-first") return sorted;
      if (sortedOrder === "time-last") return sorted.reverse();

      return tasks;
    };

    const sortByCompleted = (orderSort: string): Task[] => {
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((a: Task, b: Task) => {
        if (a.completed) return -1;
        if (b.completed) return 1;
        return 0;
      });

      if (orderSort === "completed-first") return sorted;
      if (orderSort === "uncompleted-first") return sorted.reverse();

      return tasks;
    };

    if (sortedBy === "time-first" || sortedBy === "time-last")
      setSortedTasks(sortByDate(sortedBy));
    if (sortedBy === "completed-first" || sortedBy === "uncompleted-first")
      setSortedTasks(sortByCompleted(sortedBy));
    if (sortedBy === "") {
      setSortedTasks(tasks);
    }
  }, [sortedBy, tasks]);

  return { sortedBy, setSortedBy, sortedTasks };
};

export default useSortTasks;
