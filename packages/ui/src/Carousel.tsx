"use client"
import React, { useEffect, useState } from "react";
import {ChevronLeft, ChevronRight} from "react-feather"
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';
import dotenv from "dotenv"

dotenv.config()

export const PCarousel = () => {

  const [currentImg, setCurrentImg] = useState(0)
  const [imageUrls,setImageUrls] = useState<string[]>([])
    
    useEffect(() => {
      const fetchImages = async () => {
        const listRef = ref(storage, "gs://swiftshopper01.appspot.com/Carousel")
        try {
          const res = await listAll(listRef);
          const urls = await Promise.all(
            res.items.map((itemRef) => getDownloadURL(itemRef))
          );
          setImageUrls(urls);
        } catch (error) {
          console.error('Error fetching image URLs:', error);
        }
      };
      fetchImages()
    }, [])
    
    const prev = () => {
      setCurrentImg((currentImg) => currentImg === 0 ? imageUrls.length - 1 : currentImg - 1)
    }
    const next = () => {
      if (imageUrls.length > 0) {
        setCurrentImg((currentImg) => currentImg === (imageUrls.length - 1) ? 0 : currentImg + 1)
      }
    }
      
    useEffect(() => {
        const slideInterval = setInterval(next, 3000)
        return () => clearInterval(slideInterval)
    }, [imageUrls])

    return (
        <div className="overflow-hidden relative">
          <div className="flex transition-transform ease-out duration-500" style={{transform: `translateX(-${currentImg*100}%)`}}>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt="" />
              ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={prev} className="p-8 rounded-full hover:shadow-md">
              <ChevronLeft/>
            </button>
            <button onClick={next} className="p-8 rounded-full hover:shadow-md">
              <ChevronRight/>
            </button>
          </div>
        </div>
    )
}


