import { useState, useEffect } from 'react'
import styles from './HorizontalBar.module.css'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { fetchTasks, showTasks } from '../features/tasks/tasksSlice'
import TaskModal from './TaskModal'
import { useSelector } from 'react-redux'
import AlertsPopup from './AlertsPopup'
import { showCurrentDate } from './utils/utils'
import CustomButton from './common/CustomButton/CustomButton'

const HorizontalBar = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const todayTasks = useSelector(showTasks)
    const isPopupVisible = Boolean(todayTasks.length && showPopup)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);

        return () => window.removeEventListener("click", handleOutsideClick);
    }, []);

    useEffect(() => {
        if (!search.length) dispatch(fetchTasks())
    }, [dispatch, search, setSearch])

    const handleOutsideClick = () => {
        setShowPopup(false)
    };

    const handleInputSearchEvent = (event: any) => {
        setSearch(event.target.value)
    }

    const handleBtnEvent = (event: any) => {
        event.preventDefault()
        dispatch(fetchTasks({ search }))
    }

    const HandleAlertPopupEvent = (event: any) => {
        event.stopPropagation();
        setShowPopup(show => !show)
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <input type="search" placeholder="Search..." onChange={(e) => handleInputSearchEvent(e)} />
                <button type="submit" onClick={(event) => handleBtnEvent(event)}>
                    Search
                </button>
            </form>
            <div>{showCurrentDate()}</div>
            <div className={styles.notificationPart}>
                <img src={Boolean(todayTasks.length) ? '/bell-alert.svg' : '/bell.svg'}
                    onClick={HandleAlertPopupEvent}
                    role="button"
                    alt='Notification bell'
                    width="30px"
                    style={{ cursor: "pointer", marginRight: "15px" }} />
                {isPopupVisible && <div className={styles.popup}><AlertsPopup tasksCount={todayTasks.length} /></div>}

                <TaskModal nameForm="Add a task" modalIsOpen={showModal} setIsOpen={setShowModal}>
                    <CustomButton
                        style={{ height: '50px', background: 'rgb(91, 33, 182)' }}
                        onClick={handleShowModalEvent}>
                        Add new task
                    </CustomButton>
                </TaskModal>
            </div>
        </div>
    )
}

export default HorizontalBar
