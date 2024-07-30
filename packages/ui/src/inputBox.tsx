import React from "react";

interface inputProps {
    label?: string;
    type: string;
    placeHolder: string;
    value?: string;
    max?: number;
    onInput: () => void
}

export const InputBox = ({label, type, placeHolder, onInput, value}: inputProps) => {
    return (
        <div className="flex flex-col">
            <label id={label} className="px-1 py-1"> 
                {label} 
                <input type={type} placeholder={placeHolder} name={label} onInput={onInput} value={value} className="w-64 p-1" required/>
            </label>
        </div>
    )
}