import { getTasks, getCompletedTasks, getTodayTasks, Task } from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import ShowTodaysTasks from "./ShowTodaysTasks"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"

const Section = () => {
    const allTasks = useSelector(getTasks)
    const completedTasks = useSelector(getCompletedTasks)
    const todayTasks = useSelector(getTodayTasks)
    const todayTasksCompleted = todayTasks.filter((task: Task) => task.completed)
    const showTodaysTasks = Boolean(todayTasks.length > 0)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.account}>
                    <span>Hi, User!</span>
                    <img src="img_avatar.png" alt="Avatar" className={styles.avatar} />
                </div>
                {showTodaysTasks && <CompletedTasksProgressBar
                    all={todayTasks.length}
                    completed={todayTasksCompleted.length}
                    progressBarName="Tasks today"
                />}
                <CompletedTasksProgressBar
                    all={allTasks.length}
                    completed={completedTasks.length}
                    progressBarName="All tasks"
                />
                <hr style={{ border: '1px dashed' }} />
                {showTodaysTasks && <ShowTodaysTasks tasks={todayTasks} />}
            </div>
        </div>
    )
}

export default Section