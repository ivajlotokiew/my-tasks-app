import { getTasks, getCompletedTasks } from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"

const Section = () => {
    const allTasks = useSelector(getTasks)
    const completedTasks = useSelector(getCompletedTasks)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.account}>
                    <span>Hi, User!</span>
                    <img src="img_avatar.png" alt="Avatar" className={styles.avatar} />
                </div>
                <CompletedTasksProgressBar all={allTasks.length} completed={completedTasks.length} />
                <hr style={{ border: '1px dashed' }} />
            </div>
        </div>
    )
}

export default Section