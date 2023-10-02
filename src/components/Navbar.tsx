import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import CustomButton from "./common/CustomButton/CustomButton"
import { useState } from "react"
import TaskModal from "./TaskModal"
import Directories from "./Directories"
import NewDirectory from "./NewDirectory"

const navBarMenu = [
    { target: 'today', name: "Today's tasks" },
    { target: '/', name: "All tasks" },
    { target: 'important', name: "Important tasks" },
    { target: 'completed', name: "Completed tasks" },
    { target: 'uncompleted', name: "Uncompleted tasks" }
]

const Navbar = () => {
    const [showModal, setShowModal] = useState(false)
    const [openDirectories, setOpenDirectories] = useState(false)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    return (
        <div className={styles.wrapper}>
            <h3>TO-DO LIST</h3>
            <div style={{ marginBottom: '15px' }}>
                <TaskModal nameForm="Add a task" modalIsOpen={showModal} setIsOpen={setShowModal}>
                    <CustomButton
                        style={{ width: '-webkit-fill-available', margin: '0 15px', padding: '15px 0', background: 'rgb(91, 33, 182)' }}
                        onClick={handleShowModalEvent}>
                        Add new task
                    </CustomButton>
                </TaskModal>
            </div>
            <div className={styles.container}>
                {navBarMenu.map((item) =>
                    <div className={styles.navLink} key={item.target}>
                        <NavLink to={item.target} style={({ isActive }) => {
                            return {
                                display: "block",
                                backgroundColor: isActive ? "rgba(255, 0, 0, 0.3)" : "",
                                borderRightWidth: '10px',
                                borderColor: isActive ? 'yellow' : 'blue',
                            };
                        }}>
                            {item.name}
                        </NavLink>
                    </div>)}
                <div className={styles.directories}>
                    <div style={{ cursor: "pointer" }} onClick={() => setOpenDirectories(open => !open)}>
                        {openDirectories ?
                            <img src='/arrow-down.svg' alt='dirImg' width="12" height='12' /> :
                            <img src='/arrow-right.svg' alt='dirImg' width="12" height='12' />}
                        <span style={{ marginLeft: "8px" }}>Directories</span>
                    </div>
                    {openDirectories &&
                        <>
                            <Directories />
                            <NewDirectory />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar