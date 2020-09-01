import { remote } from "electron"
import { useEffect, useState } from "react"

let GetName = ({ id, dbName }) => {

    let [name, setName] = useState(null)

    let getName = async (id) => {
        let { name } = await remote.getGlobal(dbName).read(id)
        console.log(name)
        setName(name)
    }

    useEffect(() => { getName(id) }, [])

    return <span>{name}</span>
}

export default GetName