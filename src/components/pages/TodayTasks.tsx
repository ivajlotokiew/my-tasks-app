import { useSelector, useDispatch } from "react-redux"
import { fetchTasks, showTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"
import { useEffect, useState } from "react"

const TodayTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showTasks)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const getTodayTasks = async () => {
            try {
                await dispatch(fetchTasks({ today: true })).unwrap()
            } catch (e) {
                setError(e);
                console.error(e);
            }
        }

        getTodayTasks()
    }, [dispatch, error])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Today's" />
        </div>
    )
}


export default TodayTasks