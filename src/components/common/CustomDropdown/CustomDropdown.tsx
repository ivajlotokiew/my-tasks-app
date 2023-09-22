import styles from './CustomDropdown.module.css'

type Option = {
    label: string;
    value: any;
    disabled?: boolean
};

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[],
    selectedValue: string,
}

const CustomDropdown = ({ options, selectedValue, ...attributes }: Props) => {
    return (
        <>
            <select className={styles.wrapper}
                {...attributes}
                value={selectedValue}>
                {options.map(option => (
                    <option key={option.value} disabled={option.disabled ? true : false} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export default CustomDropdown;
