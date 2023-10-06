import { useState } from "react";
import { Task, editTaskAction, isLoadingActionOnTask } from "../features/tasks/tasksSlice";
import styles from "./TaskItem.module.css";
import { useDispatch, useSelector } from 'react-redux'
import TaskModal from "./TaskModal";
import CustomButton from "./common/CustomButton/CustomButton";
import LoadingOverlay from 'react-loading-overlay-ts';
import DeleteItemModal from "./DeleteItemModal";
import { Directory, showDirectories } from "../features/directories/directoriesSlice";
import { NavLink } from "react-router-dom";

interface Props {
    task: Task,
    reload: () => void,
    stateTasks?: string,
}

const TaskItem = ({ task, reload, stateTasks }: Props) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const loading = useSelector(isLoadingActionOnTask(task.id || 1))
    const directories = useSelector(showDirectories)
    const getTaskDirectory: Directory | undefined =
        directories.find((directory: Directory) => directory.id === task.directoryId)

    const toggleCompletedTask = () => {
        dispatch(editTaskAction({ ...task, completed: !task.completed })).then(() => {
            reload()
        })
    }

    const toggleImportantTask = async () => {
        await dispatch(editTaskAction({ ...task, important: !task.important }))
        reload()
    }

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    const handleShowDeleteModalEvent = () => {
        setShowDeleteModal(modal => !modal)
    }

    console.log('Task getTaskDirectory id: ', getTaskDirectory?.id)

    return (
        <>
            <NavLink to={`/dir/${getTaskDirectory?.id}/tasks`}>
                <div className={styles.taskDirectory}>{getTaskDirectory?.title}</div>
                <div className={styles.directoryTaskLabelPopup}>
                    {getTaskDirectory?.title}
                </div>
            </NavLink>
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
                    <div className={styles.completedTaskLabelPopup}>
                        {task.completed ? 'Unmark ' : 'Mark '} as completed
                    </div>
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
                            onClick={handleShowDeleteModalEvent}
                            style={{ cursor: "pointer", marginLeft: "10px" }} />
                        <div className={styles.deleteTaskLabelPopup}>
                            Delete task
                        </div>
                        <TaskModal task={task} modalIsOpen={showModal} directory={getTaskDirectory} stateTasks={stateTasks} setIsOpen={setShowModal} nameForm={'Edit task'}>
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
            <DeleteItemModal description="This task will be deleted permanently." itemName="task" modalIsOpen={showDeleteModal} item={task} setIsOpen={setShowDeleteModal} />

        </>
    )
}

export default TaskItem