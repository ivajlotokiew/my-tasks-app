import { useSelector } from "react-redux/es/hooks/useSelector"
import { getTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const AllTasks = () => {
    const tasks = useSelector(getTasks)

    return (
        <div>
            <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>All tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
            <Tasks tasks={tasks} />
        </div>
    )
}

export default AllTasks