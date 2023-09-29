import { Task } from '../../features/tasks/tasksSlice'

interface Props {
    tasks: Task[]
}

const ShowTodaysTasksTitle = ({ tasks }: Props) => {
    return (
        <>
            {
                tasks.length > 0 &&
                <>
                    <span style={{ fontSize: '18px', color: '#FFFFFF' }}>Today's tasks:</span>
                    <div style={{ fontSize: '16px', margin: '5px 20px' }}>
                        {tasks?.map((task: Task) => <div key={task.id}>{task.title}</div>)}
                    </div>
                </>
            }
        </>
    )
}

export default ShowTodaysTasksTitle
