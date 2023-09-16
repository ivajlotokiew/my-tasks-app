import { useSelector } from "react-redux/es/hooks/useSelector"
import { Task, getUncompletedTasks } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"

const UncompletedTasks = () => {
    const completedTasks = useSelector(getUncompletedTasks)

    return (
        <div >
            {completedTasks?.map((task: Task) =>
                <div key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    )
}

export default UncompletedTasks