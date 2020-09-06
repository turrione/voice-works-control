import Layout from '../components/layout/Layout'
import { remote, ipcRenderer } from 'electron'
import useDB from '../hooks/useDB'
import useCtxMenu from '../hooks/useCtxMenu'
import useSectionToggler from '../hooks/useSectionToggler';
import WorksNav from '../components/works/WorksNav';
import AddWork from '../components/works/AddWork';
import { useState, useEffect } from 'react';
import WorksTalbe from '../components/works/WorksTable';

const Works = () => {

    let { section, setSection } = useSectionToggler()
    let { data, create, setData, sectionData, getNewData } = useDB('workDB', section)

    // DB
    let [studios, setStudios] = useState({ db: null, docs: [] })
    let [rates, setRates] = useState({ db: null, docs: [] })
    let [directors, setDirectors] = useState({ db: null, docs: [] })

    let getDocs = async (db, setDocs, state) => {
        let docs = await db.readAll()
        setDocs({ ...state, docs })
    }

    // Get DB instances
    useEffect(() => {
        setSection('add-work')
        let studioDB, rateDB, directorDB;
        studioDB = remote.getGlobal('studioDB')
        rateDB = remote.getGlobal('rateDB')
        directorDB = remote.getGlobal('directorDB')
        setStudios({ ...studios, db: studioDB })
        setRates({ ...rates, db: rateDB })
        setDirectors({ ...directors, db: directorDB })

        ipcRenderer.on('work-change', (e, p) => getNewData())
        return () => ipcRenderer.removeListener('work-change', () => { })
    }, [])

    // Get studios from DB
    useEffect(() => {
        if (studios.db !== null) getDocs(studios.db, setStudios, studios)
    }, [studios.db])

    // Get rates from DB
    useEffect(() => {
        if (rates.db !== null) getDocs(rates.db, setRates, rates)
    }, [rates.db])

    // Get directors from DB
    useEffect(() => {
        if (directors.db !== null) getDocs(directors.db, setDirectors, directors)
    }, [directors.db])

    return (
        <Layout title="Convocatorias">
            <div className="pane-group">
                <div className="pane-sm sidebar">
                    <WorksNav
                        setSection={setSection}
                        section={section} />
                </div>
                <div className="pane">
                    {
                        section === 'add-work' &&
                        <AddWork
                            studios={studios}
                            rates={rates}
                            directors={directors.docs}
                            create={create} />
                    }
                    {
                        section === 'see-works' &&
                        <WorksTalbe
                            works={data}
                            studios={studios.docs}
                            rates={rates.docs}
                            directors={directors.docs} />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Works;