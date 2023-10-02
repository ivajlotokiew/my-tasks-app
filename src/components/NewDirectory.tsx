import { useState } from "react"
import styles from "./NewDirectory.module.css"
import DirectoryModal from "./DirectoryModal"

const NewDirectory = () => {
    const [showModal, setShowModal] = useState(false)
    console.log('render')

    const handleShowModalEvent = (e: any) => {
        setShowModal(modal => !modal)
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.directory} ${styles.newDirectory}`} onClick={(e) => handleShowModalEvent(e)}>
                <>+New</>
            </div>
            <DirectoryModal nameForm="Create new directory" modalIsOpen={showModal} setIsOpen={setShowModal} />
        </div>
    )
}

export default NewDirectory