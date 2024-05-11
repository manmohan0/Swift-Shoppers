export const Appbar = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
            <div className="flex flex-row">
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/swiftshopper01.appspot.com/o/Swift%20Shopper%20Logo.jpg?alt=media&token=58113a66-4063-4211-8292-6a6bb218214e" alt="Swift Shoppers Logo" width={'100px'} height={'40px'}/>
                </div>
                <div className="border border-slate-400 px-3 py-3 m-2">
                    <input className="p-3" type="text" name="search" id="search" />
                </div>
            </div>
        </div>
    );
};
