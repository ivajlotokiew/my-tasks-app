import { useSelector } from "react-redux/es/hooks/useSelector"
import { getTodayTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const TodayTasks = () => {
    const tasks = useSelector(getTodayTasks)

    return (
        <div>
            <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>Today's tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
            <Tasks tasks={tasks} />
        </div>
    )
}

export default TodayTasks