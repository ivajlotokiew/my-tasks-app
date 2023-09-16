import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getCompletedTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"

const CompletedTasks = () => {
    const completedTasks = useSelector(getCompletedTasks)

    return (
        <div >
            {completedTasks?.map((task: Task) =>
                <div key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default CompletedTasks