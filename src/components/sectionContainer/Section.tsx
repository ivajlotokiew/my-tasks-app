import {
    showCompletedTasksCount,
    showTodaysTasksCount,
    showTodayCompletedTasksCount,
    showTasksCount
}
    from "../../features/tasks/tasksSlice"
import CompletedTasksProgressBar from "./CompletedTasksProgressBar"
import ShowTodaysTasksTitle from "./ShowTodaysTasksTitle"
import styles from "./Section.module.css"
import { useSelector } from "react-redux"
import DeleteAllData from "./DeleteAllData"
import CustomButton from "../common/CustomButton/CustomButton"
import { useEffect, useRef, useState } from "react"
import LogoutPopup from "../LogoutPopup"

const Section = () => {
    const allTasksCount = useSelector(showTasksCount)
    const completedTasksCount = useSelector(showCompletedTasksCount)
    const todaysTasksCount = useSelector(showTodaysTasksCount)
    const todaysCompletedTasksCount = useSelector(showTodayCompletedTasksCount)
    const { authUser } = useSelector((state: any) => state.authentication);
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);

        return () => window.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleOutsideClick = () => {
        setShowPopup(false)
    };

    const RedirectPage = () => {
        window.open('https://github.com/ivajlotokiew', '_blank')
    }

    const HandleLogoutPopup = (event: any) => {
        event.stopPropagation();
        setShowPopup(show => !show)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles.account}>
                        <span>{'Hi, ' + authUser.username}</span>
                        <img src={authUser.imgURL}
                            alt="Avatar"
                            className={styles.avatar}
                            onClick={HandleLogoutPopup}
                            role="button"
                            style={{ cursor: "pointer" }}
                        />
                        {showPopup && <div className={styles.popup}><LogoutPopup user={authUser} /></div>}
                    </div>

                    {todaysTasksCount && <CompletedTasksProgressBar
                        progressBarName="Tasks today"
                        all={todaysTasksCount}
                        completed={todaysCompletedTasksCount}
                    />}

                    <CompletedTasksProgressBar
                        progressBarName="All tasks"
                        all={allTasksCount}
                        completed={completedTasksCount}
                    />

                    <hr style={{ border: '1px dashed', marginBottom: '25px' }} />
                    {todaysTasksCount && <ShowTodaysTasksTitle />}
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
