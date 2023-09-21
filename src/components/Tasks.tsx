import { useState } from "react"
import { Task } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./Tasks.module.css"
import TasksModal from "./TasksModal"
import SortBox from "./SortBox"

interface Props {
    tasks: Task[];
    stateTasksName: string;
}

const Tasks = ({ tasks, stateTasksName }: Props) => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>{stateTasksName} tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
                <SortBox />
            </div>
            <div className={styles.container}>
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
        </div>
    )
}

export default Tasks