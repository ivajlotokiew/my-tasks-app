import { useState } from "react"
import { Directory } from "../features/directories/directoriesSlice"
import styles from './DirectoryItem.module.css'
import DirectoryModal from "./DirectoryModal"
import DeleteItemModal from "./DeleteItemModal"
import { NavLink } from "react-router-dom"

interface Props {
    directory: Directory
}

const DirectoryItem = ({ directory }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const isMainDir = Number(directory.id) === 1 && directory.title === 'Main' ? true : false

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    const handleShowDeleteModalEvent = () => {
        setShowDeleteModal(modal => !modal)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <NavLink to={`dir/${directory.id}/tasks`}>
                    <div>
                        {directory.title}
                    </div>
                </NavLink>
                {!isMainDir &&
                    <div className={styles.actionIcons}>
                        <img src='/edit.svg' alt='edit icon' width="17" onClick={handleShowModalEvent} />
                        <img src='/delete.svg' alt='delete icon' width="17" onClick={handleShowDeleteModalEvent} />
                    </div>
                }
            </div >

            <DirectoryModal
                nameForm="Edit directory"
                modalIsOpen={showModal}
                directory={directory}
                setIsOpen={setShowModal}
            />

            <DeleteItemModal
                description="This directory and all its tasks will be deleted."
                itemName="directory"
                modalIsOpen={showDeleteModal}
                item={directory}
                setIsOpen={setShowDeleteModal}
            />
        </>
    )
}

export default DirectoryItem
