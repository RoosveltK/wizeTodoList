import React, { ReactNode, MouseEventHandler } from "react";

const Button = (props: {
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
    const { icon, children, className, onClick } = props;

    return (
        <button
            {...props}
            type="button"
            className={`
            px-4 py-2 text-sm 
            capitalize font-medium 
            rounded-full text-center 
            inline-flex items-center 
            text-primary hover:text-white 
            border border-primary 
            hover:bg-primary-2 focus:ring-4 
            focus:outline-none 
            focus:ring-blue-300 
            ${className}
            `}
            onClick={onClick}
        >
            {icon}
            {children}
        </button>
    );
};

export default Button;
