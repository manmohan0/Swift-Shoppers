// import React from "react";

import React from "react";

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    value: string;
    onClick: React.MouseEventHandler
}

export const GreenBorderButton = ({type, value, onClick}: ButtonProps) => {
        return (
            <div className="flex cursor-pointer justify-center m-0">
                <button className="border-green-600 border-2 px-8 py-3 w-max" onClick={onClick} type={type} >{value}</button>
            </div>
        )
}