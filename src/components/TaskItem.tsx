import { Task, toggleCompletedTaskReducer, toogleImportantTaskReducer, deleteTaskReducer } from "../features/tasks/tasksSlice";
import CustomButton from "./CustomButton";
import styles from "./TaskItem.module.css";
import { useDispatch } from 'react-redux'
import TasksModal from "./TasksModal";

interface Props {
    task: Task
}

const TaskItem = ({ task }: Props) => {
    const dispatch = useDispatch();

    const toggleCompletedTask = () => {
        dispatch(toggleCompletedTaskReducer(task.id))
    }

    const toggleImportantTask = () => {
        dispatch(toogleImportantTaskReducer(task.id))
    }

    const deleteTask = () => {
        dispatch(deleteTaskReducer(task.id))
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
                <CustomButton onClick={toggleCompletedTask}>{task.completed ? 'completed' : 'uncompleted'}</CustomButton>
                <div className={styles.hdgLabelInfo} style={{ display: "flex", alignItems: "center" }}>
                    <img src={task.important ? '/star-white.svg' : '/star-red.svg'}
                        className={styles.starIcon}
                        role="button"
                        alt='mySvgImage'
                        width="22"
                        onClick={toggleImportantTask}
                        style={{ cursor: "pointer", marginLeft: "10px" }} />
                    <div className={styles.importantTaskLabelPopup}>
                        Mark as {task.important ? ' not important' : ' important'}
                    </div>
                    <img src='/trash-white.svg'
                        className={styles.trashIcon}
                        role="button"
                        alt='mySvgImage'
                        width="22"
                        onClick={deleteTask}
                        style={{ cursor: "pointer", marginLeft: "10px" }} />
                    <div className={styles.deleteTaskLabelPopup}>
                        Delete task
                    </div>
                    <TasksModal />
                    <div className={styles.editTaskLabelPopup}>
                        Edit task
                    </div>

                </div>
            </div>
        </>
    )
}

export default TaskItem