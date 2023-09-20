import { Link } from "react-router-dom"
import CustomButton from "./CustomButton"
import styles from './AlertsPopup.module.css'

interface Props {
    tasksCount: number
}

const AlertsPopup = ({ tasksCount }: Props) => {
    return (

        <div className={styles.wrapper}>
            <h4>You have {tasksCount} uncompleted tasks today</h4>
            <Link to="/today">
                <CustomButton style={{ background: 'rgb(25, 39, 72)' }}>See today's tasks</CustomButton>
            </Link>
        </div>
    )
}

export default AlertsPopup