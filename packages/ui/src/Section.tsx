"use client"

import { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../firebaseConfig"
import { ChevronLeft, ChevronRight } from "react-feather"

export const Section = ({title}:{title:string}) => {

    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [imageName, setImageName] = useState<string[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            const listRef = ref(storage, "gs://swiftshopper01.appspot.com/All Sections/Best Of Electronics")
            try {
                const res = await listAll(listRef)
                const urls = await Promise.all(
                    res.items.map((itemRef) => getDownloadURL(itemRef))
                )
                const names = await Promise.all(
                    res.items.map(itemRef => itemRef.name)
                )
                setImageUrls(urls)
                setImageName(names)
            } catch (error) {
                console.log(error)
            }
        }
        fetchImages()
    },  [])

    const image_Names: string[] = []

    imageName.map(name => {
        if (name.length > 24){
            const current_Name = name.split(".")[0]
            image_Names.push(current_Name?.slice(0, 24) +"...")
        }else{
            const current_Name = name.split(".")[0]
            image_Names.push(current_Name? current_Name:"")
        }
    })

    return <div className="m-5 bg-white p-3">
        <span className="text-lg font-bold">{title}</span>
        <div className="relative">
            <div className="flex justify-center mt-5 space-x-3">
                {imageUrls.map((url, index) => (
                    <div key={index} className="p-5 w-96 flex flex-col justify-between border border-black ">
                        <img src={url} alt="Something" />
                        <span className="text-xs">
                        {image_Names[index]}
                        </span>
                    </div>
                ))}
            </div>
            <div className=" absolute inset-0 flex items-center justify-between">
                <button className="p-8 rounded-full hover:shadow-md">
                    <ChevronLeft/>
                </button>
                <button className="p-8 rounded-full hover:shadow-md">
                    <ChevronRight/>
                </button>
            </div>
        </div>
    </div>
}