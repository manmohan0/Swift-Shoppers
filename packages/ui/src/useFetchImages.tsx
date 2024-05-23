import {useEffect, useState} from "react"
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';

export const useFetchImages = (folder_Link:any) => {
    const [imageUrls,setImageUrls] = useState<string[]>([])
        
    useEffect(() => {
      const fetchImages = async () => {
        const listRef = ref(storage, folder_Link)
        try {
          const res = await listAll(listRef);
          const urls = await Promise.all(
            res.items.map((itemRef) => getDownloadURL(itemRef))
          );
          setImageUrls(urls);
          // const image_Urls = imageUrls
          console.log(imageUrls)
          return [imageUrls, setImageUrls]
        } catch (error) {
          console.error('Error fetching image URLs:', error);
        }
      };
    }, [])
}

