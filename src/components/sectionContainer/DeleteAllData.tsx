import { useDispatch } from "react-redux"
import { deleteAllDataReducer } from "../../features/tasks/tasksSlice"
import CustomButton from "../common/CustomButton/CustomButton"

const DeleteAllData = () => {
    const dispatch = useDispatch()
    const deleteAllData = () => {
        dispatch(deleteAllDataReducer())
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
