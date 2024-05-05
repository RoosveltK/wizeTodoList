import React, {useId} from "react";

const Input = (props: {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    type?: string;
    label?: string;
    disabled?: boolean;
}) => {
    const {label, className, onChange, disabled} = props;
    const id = useId()

    return (
        <>
            {label && <label htmlFor={id}
                             className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
            <input
                {...props}
                type={props.type || 'text'}
                id={id}
                className={`h-full  bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 
                block w-full p-3 ${className} ${disabled ? 'cursor-not-allowed bg-gray-300' : ''}`}
                onChange={onChange}
            />
        </>
    )
};

export default Input;
