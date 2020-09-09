import { remote } from 'electron'
import { useState, useEffect } from "react"

function useCollections(collections = []) {

    let [dbInstances, setDbInstances] = useState(null)
    let [data, setData] = useState(null)
    let [isReady, setIsReady] = useState(false)

    // DB METHODS
    // Create
    let create = async (doc, dbName) => {
        await dbInstances[dbName].create(doc)
        let newData = await dbInstances[dbName].readAll()
        setData({ ...data, [dbName]: newData })
    }

    // Get details
    let getDetails = async (id, dbName) => {
        let doc = await dbInstances[dbName].read(id)
        return doc
    }

    // Delete
    let deleteOne = async (id, dbName) => {
        console.log('dbInstances =>', { ...dbInstances })
        console.log('data => ', { ...data })
        console.log('collections => ', collections)
        await dbInstances[dbName].deleteOne(id)
        let newData = await dbInstances[dbName].readAll()
        setData({ ...data, [dbName]: newData })
    }

    // Update
    let updateOne = async (id, updatedDoc, dbName) => {
        console.log('updating...', id, updatedDoc)
        await dbInstances[dbName].archive(id, updatedDoc)
        let newData = await dbInstances[dbName].readAll()
        console.log(newData)
        setData({ ...data, [dbName]: newData })
    }

    // EFFECTS
    // ComponentDidMount
    useEffect(() => {
        console.log('mounting componentt')
        let newDBIs = {}
        collections.forEach(col => newDBIs[col] = remote.getGlobal(col))
        console.log('db instances settted', newDBIs)
        setDbInstances(newDBIs)
    }, [])

    // When DBs are instanciated, request all docs and set data with response
    useEffect(() => {
        if (
            dbInstances !== null &&
            data === null &&
            Object.keys(dbInstances).length === collections.length) {
            console.log('setting data')
            let newData = {}
            const promises = collections.map(async col => newData[col] = await dbInstances[col].readAll())
            Promise.all(promises).then(() => {
                setData(newData)
                setIsReady(true)
                console.log('data setted => ', newData)
            })
            // collections.forEach(async col => newData[col] = await dbInstances[col].readAll())
            // setData(newData)
        }
    }, [dbInstances])

    return {
        data,
        create,
        getDetails,
        deleteOne,
        updateOne,
        isReady
    };
}

export default useCollections;
