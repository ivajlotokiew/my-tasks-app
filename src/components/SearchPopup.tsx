import styles from './SearchPopup.module.css'
import CustomButton from "./common/CustomButton/CustomButton"
import { useDispatch } from "react-redux"
import { Task } from '../features/tasks/tasksSlice'
import { useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'


interface Props {
    tasks: Task[] | [],
    setShow: (res: boolean) => void,
    setSearch: (res: string) => void,
    search: string,
}

const SearchPopup = ({ tasks, setShow, search, setSearch }: Props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = (event: any) => {
            setShow(false)
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [dispatch, setShow]);

    const handleBtnEvent = (event: any) => {
        event.preventDefault()
        setSearch('')
        search ?
            navigate({
                pathname: "results",
                search: `?${createSearchParams({
                    q: search
                })}`
            }) : navigate("/")
    }

    const handlePointedTask = (id: number) => {
        setSearch('')
        navigate({
            pathname: `task/${id}`,
        })
    }


    return (
        <div className={styles.wrapper}>
            {tasks.length > 0 ? tasks.map((task: any) => <div key={task.id}
                onClick={() => handlePointedTask(task.id)}>{task.title}</div>) : 'No tasks found'}
            <div>
                <CustomButton style={{ background: 'rgb(51, 65, 85)', marginTop: '20px' }}
                    onClick={handleBtnEvent}>All resuls for "{search}"</CustomButton>
            </div>
        </div>
    )
}

export default SearchPopup