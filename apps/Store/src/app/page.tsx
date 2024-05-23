import { Carousel } from "@repo/ui/Carousel"
import { Section } from "@repo/ui/Section"

export default function Home() {
  return (
    <div>
      <div className="p-5 px-20 mt-2 mr-2  bg-yellow-300 flex space-x-16 justify-center">
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FGrocery.webp?alt=media&token=e2618728-eee7-43cd-b32b-15d4467a7928" alt="Grocery" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Grocery</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FMobiles.webp?alt=media&token=34e7934d-0a8a-46af-8cbf-793ac0f60e91" alt="Mobiles" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Mobiles</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FFashion.webp?alt=media&token=61d3c58e-d760-48cd-a652-7d87b93b7334" alt="Fashion" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Fashion</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FElectronics.webp?alt=media&token=3ba838b7-9a44-4b57-a7a5-b6df3083aa0c" alt="Electronics" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Electronics</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FHome%20%26%20Furniture.webp?alt=media&token=1d00f165-6fe9-4b82-8190-61bfe5733993" alt="Home & Furniture" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Home & Furniture</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FAppliances.webp?alt=media&token=75a8c772-a320-4769-a8a2-884726332704" alt="Appliances" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Appliances</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FBeauty%2C%20Toys%20%26%20More.webp?alt=media&token=c7a6bab2-56b8-44bd-ad15-899070c241bf" alt="Beauty, Toys & More" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Beauty, Toys & More</span>
        </div>
        <div className="flex flex-col bg-white px-4 justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/All%20Sections%2FTwo%20Wheelers.webp?alt=media&token=093564bb-a13d-4c6e-9b50-4014630a21c3" alt="Two Wheelers" className="w-16 h-16 m-auto"/>
          <span className="text-sm font-semibold text-center w-full my-3">Two Wheelers</span>
        </div>
      </div>
      <Carousel/>
      <Section title="Best of Electronics"/>
    </div>

    
  );

}
