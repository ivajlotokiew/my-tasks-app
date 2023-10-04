import { useDispatch } from "react-redux"
import { deleteAllTasksAction } from "../../features/tasks/tasksSlice"
import { deleteAllDirectoriesAction } from "../../features/directories/directoriesSlice"
import CustomButton from "../common/CustomButton/CustomButton"
import { useNavigate } from "react-router-dom"

const DeleteAllData = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteAllData = async () => {
        try {
            await dispatch(deleteAllTasksAction()).unwrap()
            await dispatch(deleteAllDirectoriesAction()).unwrap()
            navigate("/")
        } catch (error) {
            console.error("Failed to delete all directories and tasks. Try again soon.")
        }
    }

    return (
        <>
            <CustomButton
                style={{ color: '#e82626', backgroundColor: 'transparent', fontSize: '16px' }}
                onClick={deleteAllData}>Delete all data
            </CustomButton>
        </>
    )
}

export default DeleteAllData
