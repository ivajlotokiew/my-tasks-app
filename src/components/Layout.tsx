import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import styles from "./Layout.module.css"
import Section from "./Section"
import HorizontalBar from "./HorizontalBar"

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <HorizontalBar />
            <Navbar />
            <Outlet />
            <Section />
        </div>
    )
}

export default Layout