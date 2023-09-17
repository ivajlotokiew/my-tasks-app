import { useSelector } from "react-redux/es/hooks/useSelector"
import { getImportantTasks } from "../features/tasks/tasksSlice"
import Tasks from "./Tasks"

const ImportantTasks = () => {
    const tasks = useSelector(getImportantTasks)

    return (
        <Tasks tasks={tasks} />
    )
}

export default ImportantTasks