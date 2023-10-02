import { useState } from "react"
import { Directory } from "../features/directories/directoriesSlice"
import styles from './DirectoryItem.module.css'
import DirectoryModal from "./DirectoryModal"
import { useDispatch } from "react-redux"
import { deleteDirectoryAction } from "../features/directories/directoriesSlice"

interface Props {
    directory: Directory
}

const DirectoryItem = ({ directory }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    const deleteDirectory = async () => {
        try {
            await dispatch(deleteDirectoryAction(directory)).unwrap()
        } catch (error) {
            console.error('The directory failed to delete, please try again later.')
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div>
                    {directory.title}
                </div>
                <div className={styles.actionIcons}>
                    <img src='/edit.svg' alt='edit icon' width="16" onClick={handleShowModalEvent} />
                    <img src='/delete.svg' alt='delete icon' width="16" onClick={deleteDirectory} />
                </div>
            </div>
            <DirectoryModal nameForm="Edit directory" modalIsOpen={showModal} directory={directory} setIsOpen={setShowModal} />
        </>
    )
}

export default DirectoryItem
