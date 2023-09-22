import styles from './CustomDropdown.module.css'

export type Option = {
    label: string;
    value: any;
    disabled?: boolean;
};

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[],
    onChange: (e: any) => void;
    selectedValue: string,
}

const CustomDropdown = ({ options, selectedValue, onChange, ...attributes }: Props) => {
    return (
        <>
            <select className={styles.wrapper}
                onChange={onChange}
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
