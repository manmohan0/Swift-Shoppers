export const Appbar = () => {
    return (
    <nav className="w-full">
        <div className="flex flex-row align-middle w-full h-auto">
            <img className="w-14 m-0 p-0" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/Swift-Shopper-Logo.svg?alt=media&token=5d908f82-e364-4ad1-8cf5-4c0977d4bb16" alt="Swift Shoppers Logo"/>
            <input className="p-0 m-2 ml-40 rounded-md flex-auto" type="text" name="search" id="search" />
        </div>
    </nav>
    );
};