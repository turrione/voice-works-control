import { remote } from 'electron'
import { useState, useEffect } from "react"
import StudioWorks from './StudioWorks'

const Studio = ({ name, _id }) => {

    let [works, setWorks] = useState([])

    // Get studio works from DB
    let getStudioWorks = async (studioId) => {
        let works = await remote.getGlobal('workDB').readStudioWorks(studioId)
        setWorks(works)
    }

    useEffect(() => {
        getStudioWorks(_id)
    }, [_id])


    return (
        <>
            <h5 className="nav-group-title">{name}</h5>
            <div className="container px-3 py-3">
                <StudioWorks works={works} name={name} />
            </div>
        </>
    )
}

export default Studio