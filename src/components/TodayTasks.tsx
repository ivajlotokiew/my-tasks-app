import { useSelector } from "react-redux/es/hooks/useSelector"
import { getTodayTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const TodayTasks = () => {
    const tasks = useSelector(getTodayTasks)

    return (
        <Tasks tasks={tasks} />
    )
}

export default TodayTasks