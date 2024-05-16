"use client"
import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';
import dotenv from "dotenv"

dotenv.config()

export const Carousel = () => {

    const [imageUrls,setImageUrls] = useState<String[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            const listRef = ref(storage, process.env.STORAGE_BUCKET + "/files/~2FCarousel")
            // setImageUrl(listRef)
            console.log(storage)
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
        }

    )
    return (
        <div>
            {imageUrls}
        </div>
    )
}


