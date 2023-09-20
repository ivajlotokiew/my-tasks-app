import { useSelector } from "react-redux/es/hooks/useSelector"
import { getUncompletedTasks } from "../../features/tasks/tasksSlice"
import Tasks from "../Tasks"

const UncompletedTasks = () => {
    const tasks = useSelector(getUncompletedTasks)

    return (
        <div>
            <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>Uncompleted tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
            <Tasks tasks={tasks} />
        </div>
    )
}

export default UncompletedTasks