import styles from "./NewDirectory.module.css"

const NewDirectory = () => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.directory} ${styles.newDirectory}`}>
                <>+New</>
            </div>
        </div>
    )
}

export default NewDirectory