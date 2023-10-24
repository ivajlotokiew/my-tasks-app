import { formatDate } from "../../components/utils/utils";

export const getUserTasks = function (this: any, user: any) {
  const dirIds = user.directoryIds;
  const allTasks = this.db.tasks.where((task: any) =>
    dirIds.includes(task.directoryId)
  );

  const completedTasks = allTasks.filter((task: any) => task.completed);
  const todayTasks = allTasks.filter(
    (task: any) => task.date === formatDate(new Date())
  );
  const todayCompletedTasks = todayTasks.filter((task: any) => task.completed);

  return { allTasks, completedTasks, todayTasks, todayCompletedTasks };
};
