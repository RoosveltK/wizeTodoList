import React, { useId, ChangeEvent } from "react";
import { useTranslation } from 'react-i18next';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    className?: string;
    onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    options?: SelectOption[];
    name?: string;
}

const Select = (props: SelectProps) => {
    const { label, className, onChange, disabled, placeholder = 'choose value', value, options =[]} = props;
    const id = useId();
    const { t } = useTranslation();


    return (
        <>
            {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{t(label)}</label>}
            <select
                id={id}
                className={`block w-full h-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${className}`}
                onChange={onChange}
                disabled={disabled}
                value={value || ''}
                name={props.name}
            >
                <option value="" disabled={!value} hidden={!value}>{placeholder}</option>
                {options.map((option: SelectOption) => (
                    <option key={option.value} value={option.value}>
                        {t(option.label)}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;
