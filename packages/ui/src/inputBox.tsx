import { FormEventHandler } from "react";

interface inputProps {
    label: string;
    type: string;
    placeHolder: string;
    value?: string;
    max?: number;
    onInput: FormEventHandler
}

export const InputBox = ({label, type, placeHolder, max, onInput, value}: inputProps) => {
    return (
        <div className="flex flex-col">
            <label id={label} className="px-1 pb-1"> 
                {label} 
                <input type={type} placeholder={placeHolder} name={label} onInput={onInput} max={max} value={value} className="my-2 w-64 p-1" required/>
            </label>
        </div>
    )
}