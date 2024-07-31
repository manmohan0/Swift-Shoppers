"use client"

import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputBox } from "@repo/ui/inputBox";

export default function AddProductPage () {
    return (
        <div className="bg-white border-2 mx-40 my-20 shadow-md">
            <div className="text-xl p-5 border-b-2">
                <FontAwesomeIcon icon={faPen} />
                <span>Add Product</span>
            </div>
            <div className="flex p-4 justify-between">
                <span className="p-6 border-2 my-auto ml-10 space-x-3">
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Add Image</span>
                </span>
                <span className="grid grid-cols-5 grid-flow-row mr-10">
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                    <img className="w-20" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/product%2FToy%2FToy_1.webp?alt=media&token=c6cfbf67-c523-4550-92e1-393d9d67f8fd"/>
                </span>
            </div>
            <div className="flex flex-col my-10">
                <span className="flex border-y-2">
                    <InputBox type={"text"} label={"Product Name"} placeHolder={"Laptop"} onInput={() => console.log("Product Name")}/>
                </span>
                <span className="flex border-b-2">
                    <InputBox type={"text"} label={"Stock Level"} placeHolder={"2"} onInput={() => console.log("Stock Level")}/>
                </span>
                <span className="flex border-b-2">
                    <InputBox type={"text"} label={"Price"} placeHolder={"Price"} onInput={() => console.log("Price")}/>
                </span>
                <span className="flex border-b-2">
                    <InputBox type={"text"} label={"Product Name"} placeHolder={"Laptop"} onInput={() => console.log("Product Name")}/>
                </span>
            </div>
        </div>
    )
}