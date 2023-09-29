import { useCallback, useEffect, useState } from "react"
import Tasks from "../Tasks"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { showTasks, fetchTasks } from "../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"

const AllTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showTasks)
    const [error, setError] = useState<any>(null)


    const reload = useCallback(async () => {
        try {
            await dispatch(fetchTasks()).unwrap()
        } catch (e) {
            setError(e);
            console.error(e);
        }
    }, [dispatch, setError])

    useEffect(() => {
        reload()
    }, [reload])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} reload={reload} stateTasksName="All" />
        </div>
    )
}

export default AllTasks
