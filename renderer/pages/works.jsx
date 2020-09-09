import Layout from '../components/layout/Layout'
import { remote, ipcRenderer } from 'electron'
import useDB from '../hooks/useDB'
import useSectionToggler from '../hooks/useSectionToggler';
import WorksNav from '../components/works/WorksNav';
import AddWork from '../components/works/AddWork';
import { useState, useEffect } from 'react';
import WorksTalbe from '../components/works/WorksTable';
import useCollections from '../hooks/useCollections';

const Works = ({ query }) => {

    let { section, setSection } = useSectionToggler()

    let {
        data,
        deleteOne,
        updateOne,
        getDetails,
        create,
        isReady
    } = useCollections([
        'workDB',
        'studioDB',
        'rateDB',
        'directorDB'
    ])

    useEffect(() => {
        let initialSection = query || 'add-work'
        setSection(initialSection)
        ipcRenderer.on('work-change', (e, p) => window.location = '/works?section=see-works')
        return () => ipcRenderer.removeListener('work-change', () => { })
    }, [])

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
                        isReady &&
                        <>
                            {
                                section === 'add-work' &&
                                <AddWork
                                    studios={data.studioDB}
                                    rates={data.rateDB}
                                    directors={data.directorDB}
                                    create={create} />
                            }
                            {
                                section === 'see-works' &&
                                <WorksTalbe
                                    works={data.workDB}
                                    studios={data.studioDB}
                                    rates={data.rateDB}
                                    directors={data.directorDB} />
                            }
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

Works.getInitialProps = async ({ query }) => {
    let { section } = query;

    return {
        query: section
    }
}

export default Works;