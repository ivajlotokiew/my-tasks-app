import { useDispatch, useSelector } from "react-redux"
import { Directory, fetchDirectories, showDirectories } from "../features/directories/directoriesSlice"
import { useEffect } from "react"
import styles from "./Directories.module.css"
import DirectoryItem from "./DirectoryItem"

interface Props {
    open: boolean
}

const Directories = ({ open }: Props) => {
    const dispatch = useDispatch()
    const directories = useSelector(showDirectories)

    useEffect(() => {
        const getDirectories = async () => {
            await dispatch(fetchDirectories())
        }

        getDirectories()
    }, [dispatch])


    return (
        <div className={styles.wrapper}>
            {open && directories.map((directory: Directory) =>
                <DirectoryItem directory={directory} key={directory.id} />
            )}
        </div>
    )
}

export default Directories