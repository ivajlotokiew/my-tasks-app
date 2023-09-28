import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import styles from "./Layout.module.css"
import Section from "./sectionContainer/Section"
import HorizontalBar from "./HorizontalBar"
import { useDispatch } from "react-redux"
import { fetchUser } from '../features/tasks/tasksSlice'

const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        <>
            <div className={styles.wrapper}>
                <HorizontalBar />
                <Navbar />
                <Outlet />
                <Section />
            </div>

        </>
    )
}

export default Layout
