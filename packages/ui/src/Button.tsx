import React from "react";

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    value: string;
    onClick: React.MouseEventHandler
}

export const Button = ({type, value, onClick}: ButtonProps) => {
        return (
            <div className="flex justify-center m-0">
                <button className="bg-orange-300 cursor-pointer p-2 w-max" onClick={onClick} type={type} >{value}</button>
            </div>
        )
}