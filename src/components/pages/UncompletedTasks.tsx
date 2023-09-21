import { useSelector } from "react-redux/es/hooks/useSelector"
import { getUncompletedTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"

const UncompletedTasks = () => {
    const tasks = useSelector(getUncompletedTasks)

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Uncompleted" />
        </div>
    )
}

export default UncompletedTasks