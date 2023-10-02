import { useState } from "react";
import { Task, editTaskAction, deleteTaskAction, isLoadingEditedTask, fetchUser } from "../features/tasks/tasksSlice";
import styles from "./TaskItem.module.css";
import { useDispatch, useSelector } from 'react-redux'
import TaskModal from "./TaskModal";
import CustomButton from "./common/CustomButton/CustomButton";
import LoadingOverlay from 'react-loading-overlay-ts';

interface Props {
    task: Task,
    reload: () => void,
    stateTasks?: string,
}

const TaskItem = ({ task, reload, stateTasks }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector(isLoadingEditedTask)

    const toggleCompletedTask = () => {
        dispatch(editTaskAction({ ...task, completed: !task.completed })).then(() => {
            reload()
        })
    }

    const toggleImportantTask = async () => {
        await dispatch(editTaskAction({ ...task, important: !task.important }))
        reload()
    }

    const deleteTask = async () => {
        await dispatch(deleteTaskAction(task))
        reload()
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
                {task.date}
            </div>
            <hr className={styles.lineSeparator} />
            <LoadingOverlay
                active={loading}
                spinner
                styles={{
                    spinner: (base) => ({
                        ...base,
                        '& svg circle': {
                            stroke: 'rgba(255, 0, 0, 0.5)'
                        }
                    }),
                }}
            >
                <div className={styles.actions}>

                    <CustomButton onClick={toggleCompletedTask}>
                        {task.completed ? 'completed' : 'uncompleted'}
                    </CustomButton>
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
                        <TaskModal task={task} modalIsOpen={showModal} stateTasks={stateTasks} setIsOpen={setShowModal} nameForm={'Edit task'}>
                            <img src='/three-dots-vertical-white.svg'
                                className={styles.threeDotsIcon}
                                role="button"
                                alt='mySvgImage'
                                width="22"
                                onClick={handleShowModalEvent}
                                style={{ cursor: "pointer", marginLeft: "10px" }} />
                        </TaskModal>
                        <div className={styles.editTaskLabelPopup}>
                            Edit task
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    )
}

export default TaskItem