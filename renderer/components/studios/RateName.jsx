import { useEffect, useState } from "react"

let RateName = ({ id }) => {

    let [name, setName] = useState(null)

    let getRateName = async (id) => {
        let { name } = await remote.getGlobal('rateDB').read(id)
        console.log(name)
        setName(name)
    }

    useEffect(() => getRateName(id), [])

    return (name)
}

export default RateName