import Layout from '../components/layout/Layout'
import { remote } from 'electron'
import useDB from '../hooks/useDB'
import useCtxMenu from '../hooks/useCtxMenu'
import useSectionToggler from '../hooks/useSectionToggler';
import { useState } from 'react';
import AddRate from '../components/rates/AddRates';
import RatesTable from '../components/rates/RatesTable';

const Rates = () => {

    let { section, setSection } = useSectionToggler()
    let { data, create, setData, sectionData } = useDB('rateDB', section)

    let [newRate, setNewRate] = useState({
        name: '',
        value: 0
    })


    let onSubmit = (e) => {
        e.preventDefault()
        create(newRate)
        setNewRate({ name: '', value: 0 })
        console.log(newRate)
    }

    return (
        <Layout title="Tarifas">
            <div className="pane-group">
                <div className="pane">
                    <AddRate
                        onSubmit={onSubmit}
                        newRate={newRate}
                        setNewRate={setNewRate} />
                    <div className="container px-3 py-3">
                        <RatesTable rates={data} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Rates;