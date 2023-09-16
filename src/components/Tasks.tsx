import { getTasks } from "../features/tasks/tasksSlice"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./Tasks.module.css"

const Tasks = () => {
    const tasks = useSelector(getTasks)

    return (
        <div className={styles.wrapper}>
            {tasks.map((task: Task) =>
                <div className={styles.task} key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default Tasks