import { useEffect, useState } from "react"
import Tasks from "../Tasks"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { showTasks, fetchTasks, isLoading } from "../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"

const AllTasks = () => {
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const tasks = useSelector(showTasks)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                await dispatch(fetchTasks()).unwrap()
            } catch (e) {
                setError(e);
                console.error(e);
            }
        }

        getAllPosts()
    }, [dispatch, error])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            {loading && <div> Loading...</div>}
            <Tasks tasks={tasks} stateTasksName="All" />
        </div>
    )
}

export default AllTasks