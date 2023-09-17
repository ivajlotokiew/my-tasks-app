import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getUncompletedTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./UncompletedTasks.module.css"

const UncompletedTasks = () => {
    const tasks = useSelector(getUncompletedTasks)

    return (
        <div className={styles.wrapper}>
            {tasks.map((task: Task) =>
                <div className={styles.task} key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default UncompletedTasks