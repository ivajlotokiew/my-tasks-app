import ProgressBar from '@ramonak/react-progress-bar'
import styles from './CompletedTasksProgressBar.module.css'

interface Props {
    all: number;
    completed: number;
    progressBarName: string;
}

const CompletedTasksProgressBar = ({ all, completed, progressBarName }: Props) => {
    const progress = Math.round(completed / all * 100)

    return (
        <div className={styles.wrapper}>
            <div className={styles.tasksInfo}>
                <span>{progressBarName}</span>
                <span>{completed}/{all}</span>
            </div>
            <ProgressBar
                completed={progress}
                barContainerClassName={styles.container}
                bgColor='rgb(91, 33, 182)'
                height='10px'
                isLabelVisible={false}
            />
        </div >
    )
}

export default CompletedTasksProgressBar
