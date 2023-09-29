import {
    showTasks,
    showCompletedTasksCount,
    showTodaysTasksCount,
    showTasksCount,
    showUserData,
    Task
}
    from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import ShowTodaysTasksTitle from "./ShowTodaysTasksTitle"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"
import DeleteAllData from "./DeleteAllData"
import CustomButton from "../common/CustomButton/CustomButton"

const Section = () => {
    const todayTasks = useSelector(showTasks)
    const todayTasksCompleted = todayTasks.filter((task: Task) => task.completed)
    const displayTodaysTasks = Boolean(todayTasks.length > 0)
    const allTasksCount = useSelector(showTasksCount)
    const completedTasksCount = useSelector(showCompletedTasksCount)
    const todaysTasksCount = useSelector(showTodaysTasksCount)
    const userData = useSelector(showUserData)

    // console.log('user data: ', userData)
    // console.log('all', allTasksCount)
    // console.log('today', todayTasksCount)
    // console.log('completed', completedTasksCount)

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

                    {displayTodaysTasks && <CompletedTasksProgressBar
                        progressBarName="Tasks today"
                        all={todaysTasksCount}
                        completed={todayTasksCompleted.length}
                    />}

                    <CompletedTasksProgressBar
                        progressBarName="All tasks"
                        all={allTasksCount}
                        completed={completedTasksCount}
                    />

                    <hr style={{ border: '1px dashed', marginBottom: '25px' }} />
                    {displayTodaysTasks && <ShowTodaysTasksTitle tasks={todayTasks} />}
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
