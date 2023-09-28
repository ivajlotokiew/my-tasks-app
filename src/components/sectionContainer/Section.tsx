import {
    showTasks,
    showTodaysTasksCount,
    showCompletedTasksCount,
    showTasksCount,
    showUserData,
    Task
}
    from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import ShowTodaysTasks from "./ShowTodaysTasks"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"
import DeleteAllData from "./DeleteAllData"
import CustomButton from "../common/CustomButton/CustomButton"

const Section = () => {
    const todayTasks = useSelector(showTasks)
    const todayTasksCompleted = todayTasks.filter((task: Task) => task.completed)
    const displayTodaysTasks = Boolean(todayTasks.length > 0)
    const allTasksCount = useSelector(showTasksCount)
    const todayTasksCount = useSelector(showTodaysTasksCount)
    const completedTasksCount = useSelector(showCompletedTasksCount)
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
                        all={todayTasksCount}
                        completed={todayTasksCompleted.length}
                        progressBarName="Tasks today"
                    />}
                    <CompletedTasksProgressBar
                        all={allTasksCount}
                        completed={completedTasksCount}
                        progressBarName="All tasks"
                    />
                    <hr style={{ border: '1px dashed', marginBottom: '25px' }} />
                    {displayTodaysTasks && <ShowTodaysTasks tasks={todayTasks} />}
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
