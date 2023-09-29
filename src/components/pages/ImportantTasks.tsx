import { useSelector, useDispatch } from "react-redux"
import { fetchTasks, showTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"
import { useCallback, useEffect, useState } from "react"

const ImportantTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showTasks)
    const [error, setError] = useState<any>(null)

    const reload = useCallback(async () => {
        try {
            await dispatch(fetchTasks({ important: true })).unwrap()
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
            <Tasks tasks={tasks} reload={reload} stateTasksName="Important" />
        </div>
    )
}

export default ImportantTasks
