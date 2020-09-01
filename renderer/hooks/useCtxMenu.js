import { useEffect } from "react"

function useCtxMenu(handleClick) {

    // ComponentDidMount
    useEffect(() => {
        window.addEventListener('contextmenu', handleClick, false)
        return () => {
            window.removeEventListener('contextmenu', handleClick, false)
        }
    }, [])

    return {};
}

export default useCtxMenu;