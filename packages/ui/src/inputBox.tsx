import { FormEventHandler } from "react";

interface inputProps {
    label?: string;
    type: string;
    placeHolder: string;
    value?: string;
    max?: number;
    onInput: FormEventHandler;
}

export const InputBox = ({label, type, placeHolder, onInput, value}: inputProps) => {
    return (
        <div className="flex mx-auto">
            <label id={label} className="px-1 py-1 flex space-x-6">
                <span className="w-32 my-auto font-medium basis-1/2 text-right">
                    {label} 
                </span> 
                <span className="basis-1/2">
                    <input type={type} placeholder={placeHolder} name={label} onInput={onInput} value={value} className="w-auto p-1" required/>
                </span>
            </label>
        </div>
    )
}