import React, { useId, ChangeEvent } from "react";

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
    multiple?: boolean;
    name?: string;
}

const Select = (props: SelectProps) => {
    const { label, className, onChange, disabled, placeholder = 'Choisissez une valeur', value,multiple, options =[]} = props;
    const id = useId();


    return (
        <>
            {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
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
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;
