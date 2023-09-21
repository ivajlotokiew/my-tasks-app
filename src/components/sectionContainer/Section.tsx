import { getTasks, getCompletedTasks, getTodayTasks } from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import ShowTodayTasks from "./ShowTodayTasks"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"

const Section = () => {
    const allTasks = useSelector(getTasks)
    const completedTasks = useSelector(getCompletedTasks)
    const todayTasks = useSelector(getTodayTasks)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.account}>
                    <span>Hi, User!</span>
                    <img src="img_avatar.png" alt="Avatar" className={styles.avatar} />
                </div>
                <CompletedTasksProgressBar all={allTasks.length} completed={completedTasks.length} />
                <hr style={{ border: '1px dashed' }} />
                <ShowTodayTasks tasks={todayTasks} />
            </div>
        </div>
    )
}

export default Section