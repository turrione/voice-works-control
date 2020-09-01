import Layout from '../components/layout/Layout'
import { remote } from 'electron'
import studioCtxMenu from '../helpers/context-menus/studios-ctx-menus';
import useDB from '../hooks/useDB'
import useCtxMenu from '../hooks/useCtxMenu'
import useSectionToggler from '../hooks/useSectionToggler';
import StudiosNav from '../components/studios/StudiosNav';
import AddStudio from '../components/studios/AddStudio';
import Studio from '../components/studios/Studio';
import LineMetrics from '../components/shared/LineMetrics';
import random_rgba from '../helpers/randomRgba';
import { getLabels, getData } from '../helpers/moment';
import { useState, useEffect } from 'react';

const Studios = () => {

    let { section, setSection } = useSectionToggler()
    let { data, create, setData, sectionData } = useDB('studioDB', section)
    let [dataLine, setDataline] = useState(null)

    // HANDLERS
    let handleRightClick = (e) => {
        e.preventDefault()
        if (e.path[0].id ? `${e.path[0].id}`.includes('studio') : false) {
            let { Menu, MenuItem } = remote
            let id = e.target.id.split('-')[1]
            studioCtxMenu(Menu, MenuItem, setData, id).popup({ window: remote.getCurrentWindow() })
        }
    }

    useCtxMenu(handleRightClick)

    let onSubmit = (e) => {
        e.preventDefault()
        create({ name: e.target.name.value })
        e.target.name.value = ''
    }

    // MERTRICS DATA
    let getDataLine = () => {
        let datasets = []
        data.map(async (studio, idx) => {
            let color = random_rgba()
            let results = await getData(studio._id)
            console.log({ name: studio.name, results, })
            datasets.push({
                label: studio.name,
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
        <Layout title="Estudios">
            <div className="pane-group">
                <div className="pane-sm sidebar">
                    <StudiosNav
                        data={data}
                        section={section}
                        setSection={setSection} />
                </div>
                <div className="pane">
                    <AddStudio onSubmit={onSubmit} />
                    <LineMetrics dataLine={dataLine} title="Convocatorias por estudio" />
                    {sectionData && <Studio {...sectionData} />}
                </div>
            </div>
        </Layout>
    )
}

export default Studios;
