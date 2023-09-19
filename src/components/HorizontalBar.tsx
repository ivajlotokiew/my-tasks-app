import styles from './HorizontalBar.module.css'

const HorizontalBar = () => {
    return (
        <div style={{ marginTop: '30px' }}>
            <form className={styles.form}>
                <input type="search" placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default HorizontalBar