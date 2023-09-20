import { useSelector } from "react-redux/es/hooks/useSelector"
import { getCompletedTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"

const CompletedTasks = () => {
    const tasks = useSelector(getCompletedTasks)

    return (
        <div>
            <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>Completed tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
            <Tasks tasks={tasks} />
        </div>
    )
}


export default CompletedTasks