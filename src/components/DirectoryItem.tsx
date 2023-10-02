import { Directory } from "../features/directories/directoriesSlice"
import styles from './DirectoryItem.module.css'

interface Props {
    directory: Directory
}

const DirectoryItem = ({ directory }: Props) => {

    return (
        <div className={styles.wrapper}>
            <div>
                {directory.title}
            </div>
            <div>
                <img src='/edit.svg' alt='edit icon' width="18" />
                <img src='/delete.svg' alt='delete icon' width="18" />
            </div>
        </div>
    )
}

export default DirectoryItem