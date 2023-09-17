import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getImportantTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./ImportantTasks.module.css"

const ImportantTasks = () => {
    const completedTasks = useSelector(getImportantTasks)

    return (
        <div className={styles.wrapper}>
            {completedTasks?.map((task: Task) =>
                <div className={styles.task} key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default ImportantTasks