import { useState } from "react"

function useSectionToggler() {

    let [section, setSection] = useState(null);

    return {
        section,
        setSection
    };
}

export default useSectionToggler;