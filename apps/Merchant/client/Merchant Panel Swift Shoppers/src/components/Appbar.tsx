import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export const Appbar = () => {

    return (
        <nav className="w-full shadow py-1">
            <div className="flex flex-row align-middle w-full h-auto">
                <Link to="/">
                    <img className="w-16 mx-20 my-0 rounded-md" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/Swift-Shopper-Logo.svg?alt=media&token=5d908f82-e364-4ad1-8cf5-4c0977d4bb16" alt="Swift Shoppers Logo"/>
                </Link>
                <input className="p-0 px-3 m-2 ml-20 bg-white rounded-md border-gray-300 flex-auto" placeholder="Search for Products, Brands and More" type="text" name="search" id="search" />
                <div className="p-3 flex pl-20 pr-0">
                    <Link to="/#" className="px-6 py-4 hover:bg-slate-100 cursor-pointer flex justify-between">
                        <span className="flex align-middle">
                        <FontAwesomeIcon icon={faUser} className="size-5"/>
                            {/* {user.firstname} */}
                        </span>
                    </Link>
                    <Link className="px-6 py-4 hover:bg-slate-100 cursor-pointer" to="#">
                        <span>
                            Cart
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};