"use client"


import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"

export const Appbar = () => {

    const session = useSession()

    if (session.data?.user) {
        const user = session.data.user
        return (
            <nav className="w-full shadow py-1">
                <div className="flex flex-row align-middle w-full h-auto">
                    <Link href="/">
                        <img className="w-16 ml-20 mr-20 my-0 rounded-md" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/Swift-Shopper-Logo.svg?alt=media&token=5d908f82-e364-4ad1-8cf5-4c0977d4bb16" alt="Swift Shoppers Logo"/>
                    </Link>
                    <input className="p-0 px-3 m-2 ml-20 bg-white rounded-md border-gray-300 flex-auto" placeholder="Search for Products, Brands and More" type="text" name="search" id="search" />
                    <div className="p-3 flex pl-20 pr-0">
                        <Link href="/Signin" className="px-6 py-4 hover:bg-slate-100 cursor-pointer flex justify-between">
                            <span className="flex align-middle">
                            <FontAwesomeIcon icon={faUser} className="size-5"/>
                                {user.firstname}
                            </span>
                        </Link>
                        <Link className="px-6 py-4 hover:bg-slate-100 cursor-pointer" href="#">
                            <span>
                                Cart
                            </span>
                        </Link>
                        <Link className="px-6 py-4 hover:bg-slate-100 cursor-pointer" href="#">
                            <span className="">
                                Become a Seller
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="w-full shadow py-1">
                <div className="flex flex-row align-middle w-full h-auto">
                    <Link href="/">
                        <img className="w-16 ml-20 mr-20 my-0 rounded-md" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/Swift-Shopper-Logo.svg?alt=media&token=5d908f82-e364-4ad1-8cf5-4c0977d4bb16" alt="Swift Shoppers Logo"/>
                    </Link>
                    <input className="p-0 px-3 m-2 ml-20 bg-white rounded-md border-gray-300 flex-auto" placeholder="Search for Products, Brands and More" type="text" name="search" id="search" />
                    <div className="p-3 pl-20 pr-0">
        
                        <Link href="/Signin" className="px-6 py-4 hover:bg-slate-100 cursor-pointer">
                            <span>
                                Login
                            </span>
                        </Link>
                        <Link className="px-6 py-4 hover:bg-slate-100 cursor-pointer" href="#">
                            <span>
                                Cart
                            </span>
                        </Link>
                        <Link className="px-6 py-4 hover:bg-slate-100 cursor-pointer" href="#">
                            <span className="">
                                Become a Seller
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
};