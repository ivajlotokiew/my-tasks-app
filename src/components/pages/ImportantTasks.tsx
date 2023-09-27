import { useSelector, useDispatch } from "react-redux"
import { fetchTasks, showImportantTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"
import { useEffect, useState } from "react"

const ImportantTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showImportantTasks)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const getImportantTasks = async () => {
            try {
                await dispatch(fetchTasks({ important: true })).unwrap()
            } catch (e) {
                setError(e);
                console.error(e);
            }
        }

        getImportantTasks()
    }, [dispatch, error])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Important" />
        </div>
    )
}

export default ImportantTasks