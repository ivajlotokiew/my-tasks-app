import { useCallback, useEffect, useState } from "react"
import Tasks from "../Tasks"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { fetchTasksByDirectory, showTasks } from "../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

const DirectoryTasks = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const tasks = useSelector(showTasks)
    const [error, setError] = useState<any>(null)

    const reload = useCallback(async () => {
        try {
            await dispatch(fetchTasksByDirectory(params.id)).unwrap()
        } catch (e) {
            setError(e);
            console.error(e);
        }
    }, [dispatch, params.id])

    useEffect(() => {
        reload()
    }, [reload])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} reload={reload} stateTasksName="Directory" />
        </div>
    )
}

export default DirectoryTasks
