import { useCallback, useEffect, useState } from 'react'
import { Task, fetchTodayTasks, showTodayTasks } from '../../features/tasks/tasksSlice'
import { useSelector, useDispatch } from 'react-redux'

const ShowTodaysTasksTitle = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showTodayTasks)
    const [error, setError] = useState<any>(null)

    const getTodayTasks = useCallback(async () => {
        try {
            await dispatch(fetchTodayTasks()).unwrap()
        } catch (e) {
            setError(e);
            console.error(error);
        }
    }, [dispatch, error])

    useEffect(() => {
        getTodayTasks()
    }, [getTodayTasks])

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
