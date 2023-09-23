import { useState } from 'react';
import styles from './SortBox.module.css'

const SortBox = () => {
    const [selectedOption, setSelectedOption] = useState("disabledOption");

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <select className={styles.wrapper} onChange={(event) => handleSelectChange(event)} value={selectedOption}>
            <option value="disabledOption" disabled>Sort by</option>
            <option value="1">Earlier first</option>
            <option value="2">Later first</option>
            <option value="3">Completed first</option>
            <option value="4">Uncompleted first</option>
        </select>
    )
}

export default SortBox