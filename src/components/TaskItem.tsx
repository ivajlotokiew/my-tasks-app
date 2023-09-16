import { Task } from "../features/tasks/tasksSlice";
import styles from "./TaskItem.module.css";


interface Props {
    task: Task
}

const TaskItem = ({ task }: Props) => {
    return (
        <>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.created}</div>
            <div>{task.completed}</div>
        </>
    )
}

export default TaskItem