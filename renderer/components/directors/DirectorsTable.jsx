import { directorData, getDirectorPayroll } from "../../helpers/getDirectorData"
import { Fragment } from "react"


const DirectorsTable = ({ directors, studios, rates, works }) => {

    // directors.forEach(dir => console.log(directorData(dir, works, rates, studios)))
    return (
        <div className="pane border-bottom">
            <table className="table-striped text-center w-full">
                <thead className="flex w-full">
                    <tr className="flex w-full">
                        <th className="w-1/5">Director</th>
                        <th className="w-1/5">Estudios</th>
                        <th className="w-1/5">Tarifa</th>
                        <th className="w-1/5">Cantidad</th>
                        <th className="w-1/5">Nómina</th>
                    </tr>
                </thead>
                <tbody style={{ maxHeight: 200 }} className="flex flex-col items-center justify-between overflow-y-scroll w-full">
                    {
                        directors.map(director =>
                            <tr className="flex w-full" key={director._id}>
                                <td className="w-1/5">{director.name}</td>
                                <td className="w-1/5">{directorData(director, works, rates, studios).studios.map((studio, i) =>
                                    <Fragment key={studio}>
                                        <span>{studio}</span>
                                        {directorData(director, works, rates, studios).studios.length > i + 1 && <hr></hr>}
                                    </Fragment>
                                )}
                                </td>
                                <td className="w-1/5">{directorData(director, works, rates, studios).rates_amounts.map((rateObj, i) =>
                                    <Fragment key={director._id + ' ' + rateObj.rate}>
                                        <span>{rateObj.rate}</span>
                                        {directorData(director, works, rates, studios).rates_amounts.length > i + 1 && <hr></hr>}
                                    </Fragment>
                                )}
                                </td>
                                <td className="w-1/5">{directorData(director, works, rates, studios).rates_amounts.map((rateObj, i) =>
                                    <>
                                        <span>{rateObj.amount}</span>
                                        {directorData(director, works, rates, studios).rates_amounts.length > i + 1 && <hr></hr>}
                                    </>
                                )}
                                </td>
                                <td className="w-1/5">
                                    {
                                        getDirectorPayroll(rates, directorData(director, works, rates, studios).rates_amounts, directorData(director, works, rates, studios).rates_amounts.money).toFixed(1) + ' €'
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <style jsx>{`
                .border-bottom {
                    border-bottom: 1px solid #ddd;
                }
            `}</style>
        </div >

    )
}

export default DirectorsTable
