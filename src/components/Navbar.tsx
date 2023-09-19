import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import CustomButton from "./CustomButton"
import { useState } from "react"
import TasksModal from "./TasksModal"

const navBarMenu = [
    { target: 'today', name: "Today's tasks" },
    { target: '/', name: "All tasks" },
    { target: 'important', name: "Important tasks" },
    { target: 'completed', name: "Completed tasks" },
    { target: 'uncompleted', name: "Uncompleted tasks" }
]

const Navbar = () => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    return (
        <div className={styles.wrapper}>
            <h3>TO-DO LIST</h3>
            <TasksModal nameForm="Add a task" modalIsOpen={showModal} setIsOpen={setShowModal}>
                <CustomButton
                    style={{ margin: '0 15px', padding: '15px 0', background: 'rgb(91, 33, 182)' }}
                    onClick={handleShowModalEvent}>
                    Add new task
                </CustomButton>
            </TasksModal>
            {navBarMenu.map((item) =>
                <div className={styles.navLink} key={item.target}>
                    <NavLink to={item.target} >
                        {item.name}
                    </NavLink>
                </div>)}
        </div>
    )
}



export default Navbar