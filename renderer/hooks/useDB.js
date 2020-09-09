import { remote } from 'electron'
import { useState, useEffect } from "react"

function useDB(dbName, section) {

    let [dbInstance, setDbInstance] = useState(null)
    let [data, setData] = useState([])
    let [sectionData, setSectionData] = useState(null)

    // METHODS
    // Create
    let create = async (doc) => {
        await dbInstance.create(doc)
        let newData = await dbInstance.readAll()
        setData(newData)
    }

    let getNewData = async () => {
        let newData = await dbInstance.readAll()
        setData(newData)
    }

    let getDetails = async (id) => {
        let doc = await dbInstance.read(id)
        setSectionData(doc)
    }

    // EFFECTS
    // ComponentDidMount
    useEffect(() => {
        setDbInstance(remote.getGlobal(dbName));
    }, [])

    // When DB is instanciated, request all docs and set data with response
    useEffect(() => {
        if (dbInstance !== null) {
            dbInstance.readAll()
                .then(DB_data => {
                    console.log(DB_data);
                    setData(DB_data);
                });
        }
    }, [dbInstance])

    useEffect(() => {
        if (section) getDetails(section)
    }, [section])

    return {
        data,
        create,
        setData,
        getNewData,
        sectionData
    };
}

export default useDB;