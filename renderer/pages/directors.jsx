import Layout from '../components/layout/Layout'
import { remote } from 'electron'
import useDB from '../hooks/useDB'
import useCtxMenu from '../hooks/useCtxMenu'
import useSectionToggler from '../hooks/useSectionToggler';
import { useState, useEffect } from 'react';
import DirectorsNav from '../components/directors/DirectorsNav';
import AddDirector from '../components/directors/AddDirector';
import directorsCtxMenu from '../helpers/context-menus/directors-ctx-menu';
import DirectorsTable from '../components/directors/DirectorsTable';
import LineMetrics from '../components/shared/LineMetrics';
import random_rgba from '../helpers/randomRgba';
import { getDirectorWorks, getLabels } from '../helpers/moment';

const Directors = () => {

    let { section, setSection } = useSectionToggler()
    let { data, create, setData, sectionData } = useDB('directorDB', section)

    let onSubmit = (e) => {
        e.preventDefault()
        create({ name: e.target.name.value })
        e.target.name.value = ''
    }

    // HANDLERS
    let handleRightClick = (e) => {
        e.preventDefault()
        if (e.path[0].id ? `${e.path[0].id}`.includes('director') : false) {
            let { Menu, MenuItem } = remote
            let id = e.target.id.split('-')[1]
            directorsCtxMenu(Menu, MenuItem, setData, id).popup({ window: remote.getCurrentWindow() })
        }
    }

    // DB
    let [studios, setStudios] = useState({ db: null, docs: [] })
    let [rates, setRates] = useState({ db: null, docs: [] })
    let [works, setDirectors] = useState({ db: null, docs: [] })
    let [dataLine, setDataline] = useState(null)

    let getDocs = async (db, setDocs, state) => {
        let docs = await db.readAll()
        setDocs({ ...state, docs })
    }

    // Get DB instances
    useEffect(() => {
        let studioDB, rateDB, workDB;
        studioDB = remote.getGlobal('studioDB')
        rateDB = remote.getGlobal('rateDB')
        workDB = remote.getGlobal('workDB')
        setStudios({ ...studios, db: studioDB })
        setRates({ ...rates, db: rateDB })
        setDirectors({ ...works, db: workDB })
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
        if (works.db !== null) getDocs(works.db, setDirectors, works)
    }, [works.db])

    useCtxMenu(handleRightClick)


    // MERTRICS DATA
    let getDataLine = () => {
        let datasets = []
        data.map(async (director, idx) => {
            let color = random_rgba()
            let results = await getDirectorWorks(director._id)
            console.log({ name: director.name, results, })
            datasets.push({
                label: director.name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: color,
                borderColor: color,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color,
                pointBackgroundColor: color,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: color,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: results
            })
            console.log({
                labels: getLabels,
                datasets
            })
            if (idx === data.length - 1) setDataline({
                labels: getLabels,
                datasets
            });
        })
    }

    useEffect(() => {
        if (data.length > 0 && dataLine === null) getDataLine()
    }, [data])

    return (
        <Layout title="Directores">
            <div className="pane-group">
                <div className="pane-sm sidebar">
                    <DirectorsNav
                        data={data}
                        section={section}
                        setSection={setSection} />
                </div>
                <div className="pane">
                    <AddDirector onSubmit={onSubmit} />
                    <LineMetrics dataLine={dataLine} title="Convocatorias por director" />
                    <DirectorsTable
                        directors={data}
                        studios={studios.docs}
                        rates={rates.docs}
                        works={works.docs} />
                    {/* {sectionData && <Studio {...sectionData} />} */}
                    <div className="container px-3 py-3">
                        container
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Directors;