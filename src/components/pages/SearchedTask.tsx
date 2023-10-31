import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTask, showTask } from "../../features/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import Tasks from "../Tasks";

const SearchedTask = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const task = useSelector(showTask)

    const getTask = useCallback(async () => {
        await dispatch(fetchTask(params.id))
    }, [dispatch, params.id])

    useEffect(() => {

        getTask()
    }, [dispatch, getTask, params.id])

    return (
        <div><Tasks tasks={[task]} reload={getTask} stateTasksName={task.title} /></div>
    )
}

export default SearchedTask