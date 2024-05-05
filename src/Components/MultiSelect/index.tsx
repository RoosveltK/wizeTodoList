import {SelectOption} from "../Select";
import React, {useId, ChangeEvent, useEffect} from "react";

interface MultiSelectProps {
    className?: string;
    onChange?: (value: SelectOption[]) => void;
    value?: SelectOption[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    options?: SelectOption[];
    multiple?: boolean;
    name?: string;

}

const MultiSelect = (props: MultiSelectProps) => {
    const {
        name,
        label,
        onChange,
        placeholder = 'Choisissez une valeur',
        value,
        options = []
    } = props;
    const id = useId();
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    useEffect(() => {
        if(value){
            setSelectedOptions(value);
        }
    }, [value])

    const toggleOption = (option: string) => {
        const temp = [...selectedOptions]


        if (option) {
            const index = temp.indexOf(option)
            if (index === -1) {
                temp.push(option);
            } else {
                temp.splice(index, 1);
            }
        }
        setSelectedOptions(temp);

        if (onChange) {
            onChange(temp);
        }
    }

    const showSelectedOptions = () => options.filter((option) => selectedOptions.findIndex((v) => v === option.value) !== -1).map((option) => option.label)
    return (
        <label className="relative" id={id}>
            <input type="checkbox" className="hidden peer"/>

            <div
                className={`w-full h-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer after:content-['▼'] after:text-xs after:ml-1`}>
                {selectedOptions.length > 0 ? showSelectedOptions().join(", ") : placeholder}
            </div>

            <div
                className="absolute w-full bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                <ul>
                    {options.map((option, i) => {
                        return (
                            <li key={option.value}>
                                <label
                                    className="flex  whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                    <input
                                        type="checkbox"
                                        name={name}
                                        checked={selectedOptions?.findIndex((v) => v === option.value) !== -1}
                                        value={option.value}
                                        className="cursor-pointer"
                                        onChange={() => toggleOption(option.value)}
                                    />
                                    <span className="ml-1">{option.label}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </label>
    );
}
export default MultiSelect;