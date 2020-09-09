import Layout from '../components/layout/Layout'
import PayrollsNav from '../components/payrolls/PayrollsNav'
import useCollections from '../hooks/useCollections'
import { useEffect, useState } from 'react'
import moment from 'moment'

const Payroll = () => {

    let [section, setSection] = useState(null)
    let [monthsWithWorks, setMonthsWithWorks] = useState([])
    let [payrolls, setPayrolls] = useState(null)

    let {
        data,
        getDetails,
        isReady,
    } = useCollections([
        'workDB',
        'studioDB',
        'rateDB',
        'directorDB'
    ])

    useEffect(() => {
        if (isReady) {
            let monthsWithWorks = data.workDB.reduce((result, work) => {
                if (result.indexOf(moment(work.date).locale('es').format('MMMM YYYY')) === -1) {
                    result.push(moment(work.date).locale('es').format('MMMM YYYY'))
                    return result
                }
                return result
            }, [])

            setMonthsWithWorks(monthsWithWorks)
        }
    }, [isReady])

    // When monthsWithWorks is setted, set section
    useEffect(() => {
        setSection(monthsWithWorks[0])
    }, [monthsWithWorks])

    // If section is setted, get section data
    useEffect(() => {
        if (section !== null && isReady) {
            let monthPayrolls = data.workDB.filter(work => moment(work.date).locale('es').format('MMMM YYYY') === section)
                .reduce((result, work) => {

                    let studio = findDoc('studioDB', work.studio).name
                    let rateById = (id) => findDoc('rateDB', id)
                    let rateByName = (name) => findByProperty('rateDB', 'name', name)

                    // If the iterated work was carried out in a studio that does not currently exist 
                    // in the payroll array, a new study is added to the payroll array
                    if (result.map(payroll => payroll.studio).indexOf(studio) === -1) {
                        let newPayroll = {}

                        newPayroll.studio = studio

                        newPayroll.amounts_rates = work.amounts_rates.reduce((res, am_ra) => {
                            let newAmountsAndRates = {}
                            newAmountsAndRates.rate = rateById(am_ra.rate).name
                            newAmountsAndRates.amount = am_ra.amount
                            // newAmountsAndRates.totals = newAmountsAndRates.totals += am_ra.amount * rate(am_ra.rate).value
                            res.push(newAmountsAndRates)
                            return res
                        }, [])

                        result.push(newPayroll)

                    } else {
                        // If the iterated work has been carried out in a studio that already exists in the payroll array, 
                        // the data of the iterated work must be added to the existing object of the study in question.

                        // Get index of studio payroll
                        let index = result.map(payroll => payroll.studio).indexOf(studio)

                        // Add amounts to existing rates and check if work rate is added
                        work.amounts_rates.forEach(am_ra => {
                            let resultAmountsRatesIndex = result[index].amounts_rates.map(a_R => a_R.rate).indexOf(rateById(am_ra.rate).name)

                            // If rate name exist in current payroll => result[index].amounts_rates array, add amounts
                            if (resultAmountsRatesIndex > -1) {
                                result[index].amounts_rates[resultAmountsRatesIndex].amount += am_ra.amount
                            } else {
                                result[index].amounts_rates.push({
                                    rate: rateById(am_ra.rate).name,
                                    amount: am_ra.amount
                                })
                            }
                        })
                    }

                    // Add all rates and amounts and set totals
                    let payrollIndex = result.map(payroll => payroll.studio).indexOf(studio)
                    let totals = result[payrollIndex].amounts_rates.reduce((total, am_ra) => {
                        total += am_ra.amount * rateByName(am_ra.rate).value
                        return total
                    }, 0)

                    result[payrollIndex].totals = Math.round(totals * 10) / 10

                    return result
                }, [])

            setPayrolls(monthPayrolls)
        }
    }, [section])

    // Helpers
    let findDoc = (db, docId) => data[db].find(doc => doc._id === docId)
    let findByProperty = (db, prop, value) => data[db].find(doc => doc[prop] === value)


    return (
        <Layout title="Nóminas">
            <div className="pane-group">
                {
                    isReady &&
                    <>
                        <div className="pane-sm sidebar">
                            {
                                (monthsWithWorks && section) &&
                                <PayrollsNav
                                    section={section}
                                    setSection={setSection}
                                    months={monthsWithWorks} />
                            }
                        </div>
                        <div className="pane">
                            <div className="container border-bottom pb-5 bg-gray-100 ">
                                <h5 className="nav-group-title">Nóminas de {section}</h5>



                                <div className="flex items-center justify-center px-5 py-5">
                                    <div className="w-full max-w-3xl">
                                        <div className="-mx-2 md:flex">
                                            {
                                                payrolls !== null && payrolls.map(payroll =>
                                                    <div key={payroll.studio} className="w-full md:w-1/3 px-2">
                                                        <div className="rounded-lg shadow-sm mb-4">
                                                            <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                                                                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                                                                    <h4 className="text-sm uppercase text-gray-500 leading-tight">{payroll.studio}</h4>
                                                                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">{payroll.totals}€</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}

export default Payroll