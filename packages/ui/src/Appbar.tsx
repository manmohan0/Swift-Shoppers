export const Appbar = () => {
    return (
        <nav>
            <div className="flex flex-row ">
                <span>
                    <img className="p-0 m-0" src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/Swift%20Shopper%20Logo.jpg?alt=media&token=58113a66-4063-4211-8292-6a6bb218214e" alt="Swift Shoppers Logo" width={'65px'} height={'40px'}/>
                </span>
                <span className="border border-slate-400 px-3 py-3">
                    <input className="p-3" type="text" name="search" id="search" />
                </span>
                
            </div>
        </nav>
    );
};
