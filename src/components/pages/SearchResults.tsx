import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchTasks, showTasks } from "../../features/tasks/tasksSlice";
import Tasks from "../Tasks";


const SearchResults = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(showTasks)
    const [error, setError] = useState<any>(null)
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q');

    const reload = useCallback(async () => {
        try {
            await dispatch(fetchTasks({ search })).unwrap()
        } catch (e) {
            setError(e);
            console.error(e);
        }
    }, [dispatch, search])

    useEffect(() => {
        reload()
    }, [reload])

    if (error) return <h2>{error}</h2>

    return (
        <div>
            <Tasks tasks={tasks} reload={reload} stateTasksName="Results" />
        </div>
    )
}

export default SearchResults;