import { useSelector } from "react-redux/es/hooks/useSelector"
import { getUncompletedTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const UncompletedTasks = () => {
    const tasks = useSelector(getUncompletedTasks)

    return (
        <Tasks tasks={tasks} />
    )
}

export default UncompletedTasks