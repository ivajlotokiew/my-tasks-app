import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"

const navBarMenu = [
    { target: 'today', name: "Today's tasks" },
    { target: '/', name: "All tasks" },
    { target: 'important', name: "Important tasks" },
    { target: 'completed', name: "Completed tasks" },
    { target: 'uncompleted', name: "Uncompleted tasks" }
]

const Navbar = () => {

    return (
        <div className={styles.wrapper}>
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