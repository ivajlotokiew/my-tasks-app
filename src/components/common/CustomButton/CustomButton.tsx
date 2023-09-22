import React from 'react';
import styles from "./CustomButton.module.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const CustomButton = ({ children, ...attributes }: Props) => {
    return (
        <button
            type="button"
            className={styles.button}
            {...attributes}
        >
            {children}
        </button>
    );
}

export default CustomButton