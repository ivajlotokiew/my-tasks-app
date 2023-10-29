import styles from './LogoutPopup.module.css'
import CustomButton from "./common/CustomButton/CustomButton"
import { logoutUser } from "../features/authentication/authenticationSlice"
import { useDispatch } from "react-redux"
import { User } from '../features/tasks/tasksSlice'
import { useEffect, useRef } from 'react'

interface Props {
    user: User,
    setShowPopup: (show: boolean) => void
}

const LogoutPopup = ({ user, setShowPopup }: Props) => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement>(null);
    const refChild = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: any) => {
            event.stopPropagation()
            setShowPopup(true)
        };

        const handleLogoutClick = (event: any) => {
            dispatch(logoutUser())
        }

        const elParent = ref.current;
        const elChild = refChild.current;
        elChild?.addEventListener("click", handleClick);
        elChild?.addEventListener("click", handleLogoutClick);

        elParent?.addEventListener('click', handleClick);

        return () => {
            elParent?.removeEventListener('click', handleClick);
            elChild?.removeEventListener('click', handleLogoutClick);
        };
    }, [dispatch, setShowPopup]);


    return (

        <div className={styles.wrapper} ref={ref}>
            <div>
                <img src={user.imgURL ?? './unknown-user.svg'}
                    alt="Avatar"
                    className={styles.avatar}
                    style={{ width: '30px' }}
                />
                <span>{user.firstName + ' ' + user.lastName}</span>
            </div>
            <div ref={refChild}>
                <CustomButton style={{ background: 'rgb(51, 65, 85)', marginTop: '20px' }}>Logout</CustomButton>
            </div>
        </div>
    )
}

export default LogoutPopup