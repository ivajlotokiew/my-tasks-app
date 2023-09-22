import { useState, useEffect } from "react";
import { Task } from "../../features/tasks/tasksSlice";

interface Props {
  tasks: Task[];
}

const useSortTasks = ({ tasks }: Props) => {
  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks);
  const [sortedBy, setSortedBy] = useState<string>("disabledOption");

  useEffect(() => {
    const copyTasks = [...tasks];
    const sortByFirstAdded = () =>
      copyTasks.sort((a: Task, b: Task) => {
        const first = Date.parse(a.created);
        const second = Date.parse(b.created);
        if (first > second) return 1;
        if (first < second) return -1;
        return 0;
      });

    const sortByLastAdded = () =>
      copyTasks.sort((a: Task, b: Task) => {
        const first = Date.parse(a.created);
        const second = Date.parse(b.created);
        if (first < second) return 1;
        if (first > second) return -1;
        return 0;
      });

    const sortByCompletedFirst = () =>
      copyTasks.sort((a: Task, b: Task) => {
        if (a.completed) return -1;
        if (b.completed) return 1;
        return 0;
      });

    const sortByUncompletedFirst = () =>
      copyTasks.sort((a: Task, b: Task) => {
        if (a.completed === true) return 1;
        if (b.completed === true) return -1;
        return 0;
      });

    if (sortedBy === "time-first") setSortedTasks(sortByFirstAdded());
    if (sortedBy === "time-last") setSortedTasks(sortByLastAdded());
    if (sortedBy === "completed-first") setSortedTasks(sortByCompletedFirst());
    if (sortedBy === "uncompleted-first")
      setSortedTasks(sortByUncompletedFirst());
  }, [sortedBy, tasks]);

  return { sortedBy, setSortedBy, sortedTasks };
};

export default useSortTasks;
