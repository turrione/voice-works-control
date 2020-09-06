import GetName from "./GetName"
import InfoAlert from "../shared/alerts/InfoAlert"

const StudioWorks = ({ works, name }) => {

    return (
        <>
            {
                works.length > 0 ?
                    <WorksTable works={works} /> :
                    <InfoAlert
                        title="Información"
                        description={`Todavía no hay convocatorias registradas en ${name} `} />
            }
        </>
    )
}



const WorksTable = ({ works }) => {
    return (
        <div className="pane padded-bottom-more">
            <table className="table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Producto</th>
                        <th className="text-center">Director</th>
                        <th className="text-center">Tarifa</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-center">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        works.map(work =>
                            <tr key={work._id}>
                                <td className="text-center">{work.product}</td>
                                <td className="text-center">
                                    {work.director && <GetName id={work.director} dbName="directorDB" />}
                                </td>

                                <td className="text-center">
                                    {
                                        work.amounts_rates.map((rate, i) =>
                                            <div key={rate.rate}>
                                                <GetName id={rate.rate} dbName="rateDB" />
                                                {work.amounts_rates.length > i + 1 && <hr></hr>}
                                            </div>
                                        )
                                    }
                                </td>

                                <td className="text-center">
                                    {
                                        work.amounts_rates.map((rate, i) =>
                                            <div key={rate.amount}>
                                                <span>{rate.amount}</span>
                                                {work.amounts_rates.length > i + 1 && <hr></hr>}
                                            </div>
                                        )
                                    }
                                </td>


                                <td className="text-center">{new Date(work.date).toLocaleDateString()}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >

    )
}


export default StudioWorks
