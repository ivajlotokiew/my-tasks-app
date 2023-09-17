import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getCompletedTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./CompletedTasks.module.css"

const CompletedTasks = () => {
    const tasks = useSelector(getCompletedTasks)

    return (
        <div className={styles.wrapper}>
            {tasks.map((task: Task) =>
                <div className={styles.task} key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default CompletedTasks