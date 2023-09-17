import { Task } from "../features/tasks/tasksSlice";
import CustomButton from "./CustomButton";
import styles from "./TaskItem.module.css";
import { useDispatch } from 'react-redux'
import { toogleTaskCompleted } from "../features/tasks/tasksSlice"

interface Props {
    task: Task
}

const TaskItem = ({ task }: Props) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toogleTaskCompleted(task.id))
    }

    return (
        <>
            <h2>{task.title}</h2>
            <h3>{task.description}</h3>
            <div className={styles.created}>
                <img src='/calendar.svg' alt='mySvgImage' width="25" />
                {task.created}
            </div>
            <div className={styles.actions}>
                <CustomButton onClick={handleClick}>{task.completed ? 'completed' : 'uncompleted'}</CustomButton>
            </div>
        </>
    )
}

export default TaskItem