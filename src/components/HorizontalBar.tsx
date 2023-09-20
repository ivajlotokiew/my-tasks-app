import { useState, useEffect } from 'react'
import styles from './HorizontalBar.module.css'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { searchTaskReducer } from '../features/tasks/tasksSlice'

const HorizontalBar = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (!search.length) dispatch(searchTaskReducer(search))
    }, [dispatch, search, setSearch])

    const showCurrentDate = () => {
        const todayDate = new Date()
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const year = todayDate.getFullYear();
        const date = monthNames[todayDate.getMonth()];
        const day = todayDate.getDate().toString().padStart(2, '0')

        return `${year}, ${date} ${day}`
    }

    const handleInputSearchEvent = (event: any) => {
        setSearch(event.target.value)
    }

    const handleBtnEvent = (event: any) => {
        event.preventDefault()
        dispatch(searchTaskReducer(search))
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
        </div>
    )
}

export default HorizontalBar
