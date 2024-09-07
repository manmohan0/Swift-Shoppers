"use client"

import { faEllipsis, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchButton } from "../components/SearchButton";
import { SearchBox } from "../components/searchBox";
import { GreenBorderButton } from "../components/GreenBorderButton"
import { OrangeBorderButton } from "../components/OrangeBorderButton"
import { Checkbox } from "@/components/ui/checkbox"
import { faEye, faStar } from "@fortawesome/free-regular-svg-icons";
import { Navigate } from "react-router-dom";

export default function Dashboard () {

    return (
      <>
        <div className="m-4 bg-white shadow-md">
            <div className="flex space-x-[850px]">
                <div className="font-semibold text-3xl px-4 py-3 text-blue-500">
                    View Products
                </div>
                <div className="flex h-10 m-auto content-center border-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="p-2 my-auto"/>
                    <SearchBox type={"text"} placeHolder={"Search"} value={""} onInput={() => console.log("searched")}/>
                    <SearchButton type={"button"} value={"Search"} onClick={() => console.log("Search Clicked")}/>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="mx-5 flex space-x-4">
                    <GreenBorderButton type={"button"} value={"Add"} onClick={() => Navigate}/>
                    <OrangeBorderButton type={"button"} value={"Delete"} onClick={() => console.log("Delete button clicked")}/>
                </div>
                <div className="flex">
                    <span className="my-auto mx-2">
                        <span className="mx-1 text-blue-600">
                            0
                        </span>
                        items selected
                    </span>
                    <span className="my-auto mx-2">
                        Total
                        <span className="mx-1 text-blue-600">
                            0
                        </span>
                        Records found
                    </span>
                </div>
            </div>
            <div>
                <table className="my-6">
                    <tbody>
                        <tr className="flex space-x-32 mx-20 bg-slate-100 px-20">
                            <th className="p-2 my-auto">
                               <Checkbox className="border-2 p-2 my-auto"/>
                            </th>
                            <th className="p-2 my-auto">
                                Image
                            </th>
                            <th className="p-2 my-auto">
                                Stock Level
                            </th>
                            <th className="p-2 my-auto">
                                Product Name
                            </th>
                            <th className="p-2 my-auto">
                                Price
                            </th>
                            <th className="p-2 my-auto">
                                Action
                            </th>
                        </tr>
                        <tr className="flex space-x-32 mx-20 bg-slate-100 px-20">
                            <th className="p-2 my-auto">
                               <Checkbox className="border-2 p-2 my-auto"/>
                            </th>
                            <th className="p-2 my-auto">
                                Real Image
                            </th>
                            <th className="p-2 my-auto">
                                Real Stock Level
                            </th>
                            <th className="p-2 my-auto">
                                Real Product Name
                            </th>
                            <th className="p-2 my-auto">
                                999
                            </th>
                            <th className="p-2 my-auto flex">
                                <button type="button" className="p-2" >
                                    <FontAwesomeIcon icon={faStar} />
                                </button>
                                <button type="button" className="p-2" >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button type="button" className="p-2" >
                                    <FontAwesomeIcon icon={faEllipsis}/>
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </>   
    )
}