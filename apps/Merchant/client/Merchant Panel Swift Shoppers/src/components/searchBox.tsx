import { FormEventHandler } from "react";

interface inputProps {
    label?: string;
    type: string;
    placeHolder: string;
    value?: string;
    max?: number;
    onInput: FormEventHandler;
}

export const SearchBox = ({label, type, placeHolder, onInput, value}: inputProps) => {
    return (
        <div className="flex mx-auto">
            <label id={label} className="px-1 py-1 flex space-x-6">
                <span>
                    <input type={type} placeholder={placeHolder} name={label} onInput={onInput} value={value} className="w-64 p-1" required/>
                </span>
            </label>
        </div>
    )
}