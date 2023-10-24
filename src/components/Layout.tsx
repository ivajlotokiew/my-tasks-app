import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import styles from "./Layout.module.css"
import Section from "./sectionContainer/Section"
import HorizontalBar from "./HorizontalBar"
import { useDispatch } from "react-redux"
import { fetchDirectories } from '../features/directories/directoriesSlice'

const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadItems = async () => {
            await dispatch(fetchDirectories())
        }

        loadItems()
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
