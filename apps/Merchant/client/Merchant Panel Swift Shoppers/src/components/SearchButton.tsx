import React from "react";

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    value: string;
    onClick: React.MouseEventHandler
}

export const SearchButton = ({type, value, onClick}: ButtonProps) => {
        return (
            <span className="flex cursor-pointer justify-center">
                <button className=" bg-blue-500 text-white px-2" onClick={onClick} type={type} >{value}</button>
            </span>
        )
}