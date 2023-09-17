import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getImportantTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"

const ImportantTasks = () => {
    const completedTasks = useSelector(getImportantTasks)

    return (
        <div >
            {completedTasks?.map((task: Task) =>
                <div key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default ImportantTasks