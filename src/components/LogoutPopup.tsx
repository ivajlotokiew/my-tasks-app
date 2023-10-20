import styles from './AlertsPopup.module.css'
import CustomButton from "./common/CustomButton/CustomButton"
import { logoutUser } from "../features/authentication/authenticationSlice"
import { useDispatch } from "react-redux"

const LogoutPopup = () => {
    const dispatch = useDispatch()

    return (

        <div className={styles.wrapper}>
            <CustomButton style={{ background: 'rgb(25, 39, 72)' }} onClick={() => dispatch(logoutUser())}>Logout</CustomButton>
        </div>
    )
}

export default LogoutPopup