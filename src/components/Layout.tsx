import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import styles from "./Layout.module.css"
import Section from "./Section"

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <Outlet />
            <Section />

        </div>
    )
}

export default Layout