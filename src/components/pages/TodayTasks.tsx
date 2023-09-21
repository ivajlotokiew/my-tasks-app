import { useSelector } from "react-redux/es/hooks/useSelector"
import { getTodayTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"

const TodayTasks = () => {
    const tasks = useSelector(getTodayTasks)

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Today's" />
        </div>
    )
}

export default TodayTasks