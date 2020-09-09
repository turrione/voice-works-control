import WindowsLayout from "../../components/layout/WindowsLayout"
import { useState, useEffect } from "react"
import useCollections from "../../hooks/useCollections"
import { remote, ipcRenderer } from "electron"

const EditWorkWindow = ({ workId }) => {

    let [work, setWork] = useState()
    let { data, deleteOne, updateOne, getDetails } = useCollections([
        'workDB',
        'studioDB',
        'rateDB',
        'directorDB'
    ])

    useEffect(() => {
        if (data !== null) getWork()
    }, [data])

    let getWork = async () => {
        let work = await getDetails(workId, 'workDB')
        setWork(work)
    }

    let updateWork = () => {
        updateOne(work._id, work, 'workDB')
        emitChange()
        hideWindow()
    }

    let deleteWork = (_id) => {
        deleteOne(_id, 'workDB')
        emitChange()
        hideWindow()
    }

    let hideWindow = () => {
        let editWindow = remote.getCurrentWindow()
        editWindow.close()
    }

    let emitChange = () => {
        ipcRenderer.send('works-change')
    }

    return (
        <WindowsLayout title="Edit work window">
            <div className="window-content h-full w-full">
                <div className="padded-more bg-gray-200">
                    {
                        work &&
                        <>
                            <div className="px-3 py-3">
                                <div className="form-group">
                                    <label>Nombre producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Producto"
                                        value={work.product}
                                        onChange={e => setWork({ ...work, product: e.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label>Estudio</label>
                                    <select
                                        className="form-control"
                                        onChange={e => setWork({ ...work, studio: e.target.value })}>
                                        <option selected="selected">Selecciona un estudio</option>
                                        {
                                            data.studioDB.map(studio =>
                                                studio._id === work.studio ?
                                                    <option selected="selected" key={studio._id}>{studio.name}</option> :
                                                    <option key={studio._id} value={studio._id} >{studio.name}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Director</label>
                                    <select
                                        className="form-control"
                                        onChange={e => setNewWork({ ...work, director: e.target.value })}>
                                        {
                                            work.director === '' && <option selected="selected">Selecciona un director</option>
                                        }
                                        {
                                            data.directorDB.map(director =>
                                                director._id === work.director ?
                                                    <option selected="selected" key={director._id}>{director.name}</option> :
                                                    <option key={director._id} value={director._id} >{director.name}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={work.date}
                                        onChange={e => setNewWork({ ...work, date: e.target.value })} />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <footer className="toolbar toolbar-footer">
                <div className="toolbar-actions">
                    <button onClick={() => hideWindow()} className="btn btn-default">Cancelar</button>
                    <button onClick={updateWork} className="btn btn-primary pull-right">Guardar</button>
                    <button
                        className="btn btn-negative pull-right"
                        onClick={() => deleteWork(work._id)}>Eliminar</button>
                </div>
            </footer>
        </WindowsLayout >
    )
}

export default EditWorkWindow

EditWorkWindow.getInitialProps = async ({ query }) => {
    let { workId } = query
    return {
        workId
    }
}