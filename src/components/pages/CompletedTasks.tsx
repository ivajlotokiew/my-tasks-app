import { useSelector, useDispatch } from "react-redux"
import { fetchTasks, showCompletedTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"
import { useEffect, useState } from "react"

const CompletedTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showCompletedTasks)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const getCompletedTasks = async () => {
            try {
                await dispatch(fetchTasks({ completed: true })).unwrap()
            } catch (e) {
                setError(e);
                console.error(e);
            }
        }

        getCompletedTasks()
    }, [dispatch, error])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Completed" />
        </div>
    )
}


export default CompletedTasks