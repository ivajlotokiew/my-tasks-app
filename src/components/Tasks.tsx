import { useState } from "react"
import { Task } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./Tasks.module.css"
import TasksModal from "./TasksModal"

interface Props {
    tasks: Task[]
}

const Tasks = ({ tasks }: Props) => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    return (
        <div className={styles.wrapper}>
            {tasks.map((task: Task) =>
                <div className={styles.task} key={task.id}>
                    <TaskItem task={task} />
                </div>)}
            <TasksModal nameForm="Add a task" modalIsOpen={showModal} setIsOpen={setShowModal}>
                <div className={`${styles.task} ${styles.newTask}`} onClick={handleShowModalEvent}>
                    <>Add new task</>
                </div>
            </TasksModal>
        </div>
    )
}

export default Tasks