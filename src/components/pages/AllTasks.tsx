import { useEffect } from "react"
import Tasks from "../Tasks"
import { showTasks, fetchTasks } from "../../features/tasks/tasksSlice"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"

const AllTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showTasks)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="All" />
        </div>
    )
}

export default AllTasks