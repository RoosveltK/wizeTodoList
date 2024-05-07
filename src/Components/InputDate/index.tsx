import React, {useEffect, useId, useRef, useState} from "react";
import {CalendarIcon} from "../../utils.tsx";

interface InputDateProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    name?: string;
}

const InputDate = ({
                       className,
                       onChange,
                       value,
                       placeholder,
                       label,
                       disabled,
                       name
                   }: InputDateProps) => {
    const id = useId();
    const [inputType, setInputType] = useState<'text' | 'date'>('text');

    useEffect(() => {
        if(value){
            handleFocus()
        }
    }, [value]);


    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        if (!value)
            setInputType('text');
    };

    return (
        <>
            <div className="relative h-full cursor-pointer">
                {label && (
                    <label
                        htmlFor={id}
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        {label}
                    </label>
                )}
                <input
                    name={name}
                    type={inputType}
                    id={id}
                    className={`cursor-pointer h-full bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-3 ${className}`}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    defaultValue={value}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {inputType !== "date" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleFocus}>
                        <CalendarIcon className="w-5 h-5"/>
                    </div>
                )}
            </div>
        </>

    );
};

export default InputDate;
