import { useState, useEffect, useCallback } from 'react'
import styles from './HorizontalBar.module.css'
import { showTodayUncompletedTasks, showTasks, Task } from '../features/tasks/tasksSlice'
import TaskModal from './TaskModal'
import { useSelector } from 'react-redux'
import AlertsPopup from './AlertsPopup'
import { showCurrentDate } from './utils/utils'
import CustomButton from './common/CustomButton/CustomButton'
import { useNavigate, createSearchParams } from 'react-router-dom'
import SearchPopup from './SearchPopup'

const HorizontalBar = () => {
    const [search, setSearch] = useState('')
    const [searchedTasks, setSearchedTasks] = useState<Task[]>([])
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState(false)
    const todayUncompletedTasks = useSelector(showTodayUncompletedTasks)
    const tasks = useSelector(showTasks)
    const isPopupVisible = Boolean(todayUncompletedTasks.length && showPopup)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);

        return () => window.removeEventListener("click", handleOutsideClick)
    }, []);

    const handleOutsideClick = () => {
        setShowPopup(false)
    };

    const handleInputSearchEvent = (event: any) => {
        setSearch(event.target.value)
    }

    const searchedResults = useCallback(async () => {
        try {
            const result = search ?
                tasks.filter((task: any) => task.title.toLowerCase().includes(search.toLowerCase())) :
                []
            setSearchedTasks(result)
            if (result.length > 0) { setShow(true) } else {
                if (!search) setShow(false)
            }
        } catch (e) {
            console.error(e);
        }
    }, [search, tasks])

    useEffect(() => {
        searchedResults()

    }, [searchedResults, search])

    const handleBtnEvent = (event: any) => {
        event.preventDefault()
        search ?
            navigate({
                pathname: "results",
                search: `?${createSearchParams({
                    q: search
                })}`
            }) : navigate("/")
    }

    const HandleAlertPopupEvent = (event: any) => {
        event.stopPropagation();
        setShowPopup(show => !show)
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <form className={styles.form}>
                    <input type="search" placeholder="Search..." onChange={(e) => handleInputSearchEvent(e)} />
                    <button type="submit" onClick={(event) => handleBtnEvent(event)} />
                </form>
                {show && <SearchPopup tasks={searchedTasks} setShow={setShow} search={search} setSearch={setSearch} />}
            </div>
            <div>{showCurrentDate()}</div>
            <div className={styles.notificationPart}>
                <img src={Boolean(todayUncompletedTasks.length) ? '/bell-alert.svg' : '/bell.svg'}
                    onClick={HandleAlertPopupEvent}
                    role="button"
                    alt='Notification bell'
                    width="30px"
                    style={{ cursor: "pointer", marginRight: "15px" }} />
                {isPopupVisible && <div className={styles.popup}><AlertsPopup tasksCount={todayUncompletedTasks.length} /></div>}

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
