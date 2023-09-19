import { useSelector } from "react-redux/es/hooks/useSelector"
import { getImportantTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const ImportantTasks = () => {
    const tasks = useSelector(getImportantTasks)

    return (
        <div>
            <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>Important tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
            <Tasks tasks={tasks} />
        </div>
    )
}

export default ImportantTasks