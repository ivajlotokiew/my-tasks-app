import { useSelector } from "react-redux/es/hooks/useSelector"
import { getTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const AllTasks = () => {
    const tasks = useSelector(getTasks)

    return (
        <Tasks tasks={tasks} />
    )
}

export default AllTasks