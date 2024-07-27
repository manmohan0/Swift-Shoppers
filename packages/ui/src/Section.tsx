"use client"

import { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../firebaseConfig"
import { ChevronLeft, ChevronRight } from "react-feather"
import React from "react"

export const Section = ({title}:{title:string}) => {

    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [imageName, setImageName] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [slidesPerPage, setSlidesPerPage] = useState(8)
    const [slideWidth, setSlideWidth] = useState(0)

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
                // console.log(urls)

                setImageUrls(urls)
                setImageName(names)
            } catch (error) {
                console.log(error)
            }
        }
        fetchImages()
    },  [])

    const slideContainerRef = React.createRef<HTMLDivElement>()
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

    // console.log(imageUrls)

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1) % imageUrls.length)
        console.log((currentIndex - 1) % imageUrls.length)
    }
    
    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % imageUrls.length)
        console.log((currentIndex + 1) % imageUrls.length)
    }

    useEffect(() => {
        if (slideContainerRef.current) {
          setSlideWidth(slideContainerRef.current.offsetWidth)
        }
    }, [slideContainerRef])

    return <div className="m-5 bg-white p-3">
        <span className="text-lg font-bold">{title}</span>
        <div className="relative">
            <div className="flex justify-center mt-5 space-x-3 transition-all duration-500" style={{ transform: `translateX(${-(currentIndex * slideWidth)}px)`}} ref={slideContainerRef}>
                {/* {imageUrls.map((url, index) => (
                    <div key={index} className="p-5 w-96 flex flex-col justify-between border border-black ">
                        <img src={url} alt="Something" />
                        <span className="text-xs">
                        {image_Names[index]}
                        </span>
                    </div>
                ))} */}
                {imageUrls.slice(currentIndex, currentIndex + slidesPerPage).map((url, index) => (
            <div key={index} className="p-5 w-40 flex flex-col justify-between border border-black ">
              <img src={url} alt="Something" />
              <span className="text-xs">{image_Names[index + currentIndex]}</span>
            </div>
          ))}
            </div>
            <div className=" absolute inset-0 flex items-center justify-between">
                <button className="p-8 rounded-full hover:shadow-md" onClick={handlePrevClick}>
                    <ChevronLeft/>
                </button>
                <button className="p-8 rounded-full hover:shadow-md" onClick={handleNextClick}>
                    <ChevronRight/>
                </button>
            </div>
        </div>
    </div>
}