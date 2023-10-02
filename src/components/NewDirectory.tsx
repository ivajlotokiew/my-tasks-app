import { useState } from "react"
import styles from "./NewDirectory.module.css"
import DirectoryModal from "./DirectoryModal"

const NewDirectory = () => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.directory} ${styles.newDirectory}`} onClick={() => handleShowModalEvent()}>
                    <>+New</>
                </div>
            </div>
            <DirectoryModal nameForm="Create new directory" modalIsOpen={showModal} setIsOpen={setShowModal} />
        </>
    )
}

export default NewDirectory