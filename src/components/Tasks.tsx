import { getTasks } from "../features/tasks/tasksSlice"
import { useSelector } from "react-redux/es/hooks/useSelector"

const Tasks = () => {
    const tasks = useSelector(getTasks)
    debugger
    return (
        <div>All Tasks</div>
    )
}

export default Tasks