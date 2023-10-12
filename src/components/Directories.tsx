import { useSelector } from "react-redux"
import { Directory, showDirectories } from "../features/directories/directoriesSlice"
import styles from "./Directories.module.css"
import DirectoryItem from "./DirectoryItem"

const Directories = () => {
    const directories = useSelector(showDirectories)

    return (
        <div className={styles.wrapper}>
            {directories.map((directory: Directory) =>
                <DirectoryItem directory={directory} key={directory.id} />
            )}
        </div>
    )
}

export default Directories
