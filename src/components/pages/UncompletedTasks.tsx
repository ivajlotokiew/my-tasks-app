import { useSelector, useDispatch } from "react-redux"
import { fetchTasks, showUncompletedTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"
import { useEffect, useState } from "react"

const UncompletedTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showUncompletedTasks)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const getUncompletedTasks = async () => {
            try {
                await dispatch(fetchTasks({ completed: false })).unwrap()
            } catch (e) {
                setError(e);
                console.error(e);
            }
        }

        getUncompletedTasks()
    }, [dispatch, error])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Uncompleted" />
        </div>
    )
}


export default UncompletedTasks