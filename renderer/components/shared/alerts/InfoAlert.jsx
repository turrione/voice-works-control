const { useState, useEffect } = require("react")

const InfoAlert = ({ title, description }) => {

    let [showAlert, setShowAlert] = useState(null)

    useEffect(() => {
        setShowAlert(true)
        return () => {
            setShowAlert(true)
        }
    }, [title, description])

    return (
        <>
            {showAlert &&
                <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-yellow-700 bg-yellow-100 border border-yellow-300 ">
                    <div slot="avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info w-5 h-5 mx-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </div>
                    <div className="text-xl font-normal  max-w-full flex-initial">
                        <div className="py-2">{title}
                            <div className="text-sm font-base">{description}</div>
                        </div>
                    </div>
                    <div className="flex flex-auto flex-row-reverse">
                        <div onClick={() => setShowAlert(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-yellow-400 rounded-full w-5 h-5 ml-2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default InfoAlert;
