import { getTasks, getCompletedTasks, getTodayTasks, Task } from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import ShowTodaysTasks from "./ShowTodaysTasks"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"
import DeleteAllData from "./DeleteAllData"
import CustomButton from "../CustomButton"

const Section = () => {
    const allTasks = useSelector(getTasks)
    const completedTasks = useSelector(getCompletedTasks)
    const todayTasks = useSelector(getTodayTasks)
    const todayTasksCompleted = todayTasks.filter((task: Task) => task.completed)
    const showTodaysTasks = Boolean(todayTasks.length > 0)

    const RedirectPage = () => {
        window.open('https://github.com/ivajlotokiew', '_blank')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>
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
                    <hr style={{ border: '1px dashed', marginBottom: '25px' }} />
                    {showTodaysTasks && <ShowTodaysTasks tasks={todayTasks} />}
                </div>
                <div className={styles.footer}>
                    <DeleteAllData />
                    <CustomButton
                        style={{ backgroundColor: 'rgb(51 65 85', width: '-webkit-fill-available' }}
                        onClick={RedirectPage}>
                        Projected By Ivaylo Tokiev
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default Section
