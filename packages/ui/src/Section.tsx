"use client"

import { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../firebaseConfig"
import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

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

    return <div className=" bg-white p-3">
        <span className="text-lg font-bold">{title}</span>
        <div>
            <div>
                <Carousel>
                <CarouselContent>
                        {imageUrls.map((url, index) => (
                            <CarouselItem className="basis-1/8">    
                                <div key={index} className="p-4 m-1 h-40 w-44 flex flex-col justify-between border ">
                                    <img src={url} alt="Something" />
                                    <span className="text-xs">
                                    {image_Names[index]}
                                    </span>
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>              
                    <CarouselPrevious className=" translate-x-9"/>
                    <CarouselNext className="-translate-x-9"/>
                </Carousel>
            </div>
        </div>
    </div>
}