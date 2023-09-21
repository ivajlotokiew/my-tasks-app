import { useState } from "react";
import { Task, toggleCompletedTaskReducer, toogleImportantTaskReducer, deleteTaskReducer } from "../features/tasks/tasksSlice";
import CustomButton from "./CustomButton";
import styles from "./TaskItem.module.css";
import { useDispatch } from 'react-redux'
import TasksModal from "./TasksModal";

interface Props {
    task: Task
}

const TaskItem = ({ task }: Props) => {
    const [showModal, setShowModal] = useState(false)
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

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    return (
        <>
            <h4>{task.title}</h4>
            <h5>{task.description}</h5>
            <div className={styles.created}>
                <img src='/calendar.svg' alt='mySvgImage' width="25" />
                {task.created}
            </div>
            <hr className={styles.lineSeparator} />
            <div className={styles.actions}>
                <CustomButton onClick={toggleCompletedTask}>{task.completed ? 'completed' : 'uncompleted'}</CustomButton>
                <div className={styles.hdgLabelInfo} style={{ display: "flex", alignItems: "center" }}>
                    <img src={task.important ? '/star-red.svg' : '/star-white.svg'}
                        className={styles.starIcon}
                        role="button"
                        alt='mySvgImage'
                        width="22"
                        onClick={toggleImportantTask}
                        style={{ cursor: "pointer", marginLeft: "10px" }} />
                    <div className={styles.importantTaskLabelPopup}>
                        {task.important ? 'Unmark ' : 'Mark '} as important
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
                    <TasksModal task={task} modalIsOpen={showModal} setIsOpen={setShowModal} nameForm={'Edit task'}>
                        <img src='/three-dots-vertical-white.svg'
                            className={styles.threeDotsIcon}
                            role="button"
                            alt='mySvgImage'
                            width="22"
                            onClick={handleShowModalEvent}
                            style={{ cursor: "pointer", marginLeft: "10px" }} />
                    </TasksModal>
                    <div className={styles.editTaskLabelPopup}>
                        Edit task
                    </div>

                </div>
            </div>
        </>
    )
}

export default TaskItem