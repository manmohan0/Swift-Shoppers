"use client"

import { Carousel } from "@repo/ui/Carousel"
import { Section } from "@repo/ui/Section"
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "@repo/ui/firebaseConfig";

export default function Home() {

  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageNames, setImageNames] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchImages = async () => {
      const listRef = ref(storage, "gs://swiftshopper01.appspot.com/All Sections/Top Section")
      try {
        const res = await listAll(listRef)
        const urls = await Promise.all(
          res.items.map(itemRef => getDownloadURL(itemRef))
        )
        const names = await Promise.all(
          res.items.map(itemRef => itemRef.name)
        )

        setImageUrls(urls)
        setImageNames(names)
      } catch (error) {
        console.log(error)
      }
    }
    fetchImages()
  }, [])
  
  const image_Names: string[] = []
  
  imageNames.map((name) => {
      const newName = name.split('.')[0]
      image_Names.push(newName)
  })
    
    return (
      <div className="bg-slate-100">
      <div className="p-5 px-20 mt-2 bg-yellow-300 flex space-x-16 justify-center">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex flex-col w-64 bg-white px-4 justify-center">
            <img src={url} alt="Grocery" className="w-16 h-16 m-auto"/>
            <span className="text-sm font-semibold text-center w-full my-3">{image_Names[index]}</span>
          </div>
        ))}
      </div>
      <Carousel/>
      <Section title="Best of Electronics"/>
    </div>
  );
}
