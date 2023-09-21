import { useSelector } from "react-redux/es/hooks/useSelector"
import { getCompletedTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"

const CompletedTasks = () => {
    const tasks = useSelector(getCompletedTasks)

    return (
        <div>
            <Tasks tasks={tasks} stateTasksName="Completed" />
        </div>
    )
}


export default CompletedTasks