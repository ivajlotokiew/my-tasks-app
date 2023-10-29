import styles from './LogoutPopup.module.css'
import CustomButton from "./common/CustomButton/CustomButton"
import { logoutUser } from "../features/authentication/authenticationSlice"
import { useDispatch } from "react-redux"
import { User } from '../features/tasks/tasksSlice'

interface Props {
    user: User
}

const LogoutPopup = ({ user }: Props) => {
    const dispatch = useDispatch()

    return (

        <div className={styles.wrapper}>
            <div>
                <img src={user.imgURL ?? './unknown-user.svg'}
                    alt="Avatar"
                    className={styles.avatar}
                    style={{ width: '30px' }}
                />
                <span>{user.firstName + ' ' + user.lastName}</span>
            </div>
            <CustomButton style={{ background: 'rgb(51, 65, 85)', marginTop: '20px' }} onClick={() => dispatch(logoutUser())}>Logout</CustomButton>
        </div>
    )
}

export default LogoutPopup