"use client"
import { storage } from "@repo/ui/firebaseConfig"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { useEffect, useState } from "react"

export default function product () {
    
    const [imageUrl, setImageUrl] = useState<string[]>([""])
    const [currentImgUrl, setCurrentImgUrl] = useState<string>("")

    useEffect(() => {
        try {
            const fetchImages = async () => {
                const linkRef = ref(storage, "gs://swiftshopper01.appspot.com/product/Toy")
                const res = await listAll(linkRef);
                const urls = await Promise.all(
                    res.items.map((itemRef) => getDownloadURL(itemRef))
                )
                setCurrentImgUrl(urls[0])
                setImageUrl(urls)
            }
            fetchImages()
            
        } catch (error) {
            console.log(error)
        }
    } , [])


    return (
        <>
            <div className="mx-40 mt-1">
                <div className="flex">
                    <div>
                        {imageUrl.map((url, index) => {
                            return <div className="borderx">
                                    <img onClick={() => setCurrentImgUrl(url)} className="pb-1 w-16" src={url} key={index}/>
                                </div>
                        })}
                    </div>
                    <div>
                        <img className="w-96 border" src={currentImgUrl} />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}