import { getTasks } from "../features/tasks/tasksSlice"
import { Task } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./Tasks.module.css"

interface Props {
    tasks: Task[]
}

const Tasks = ({ tasks }: Props) => {
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