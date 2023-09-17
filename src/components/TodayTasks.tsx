import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getTodayTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./TodayTasks.module.css"

const TodayTasks = () => {
    const tasks = useSelector(getTodayTasks)

    return (
        <div className={styles.wrapper}>
            {tasks.map((task: Task) =>
                <div className={styles.task} key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default TodayTasks