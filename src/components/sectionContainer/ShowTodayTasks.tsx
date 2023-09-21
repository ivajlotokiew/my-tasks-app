import { Task } from '../../features/tasks/tasksSlice'

interface Props {
    tasks: Task[]
}

const ShowTodayTasks = ({ tasks }: Props) => {
    return (
        <>
            {tasks?.map((task: Task) => <div key={task.id}>{task.title}</div>)}
        </>
    )
}

export default ShowTodayTasks