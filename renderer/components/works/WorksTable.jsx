import { editWindow } from "../../events/windowEvents"

const WorksTalbe = ({ works, studios, rates, directors }) => {

    return (
        <div className="pane padded-bottom-more">
            <table className="table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Estudio</th>
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
                            <tr key={work._id} onClick={() => editWindow(work._id)}>
                                <td className="text-center">{studios.filter(studio => studio._id === work.studio)[0]?.name}</td>
                                <td className="text-center">{work.product}</td>
                                <td className="text-center">
                                    {directors.filter(dir => dir._id === work.director)[0]?.name}
                                </td>

                                <td className="text-center">
                                    {
                                        (work.amounts_rates || []).map((rate, i) =>
                                            <div key={rate.rate}>
                                                <span>{rates.filter(rt => rt._id === rate.rate)[0].name}</span>
                                                {work.amounts_rates.length > i + 1 && <hr></hr>}
                                            </div>
                                        )
                                    }
                                </td>

                                <td className="text-center">
                                    {
                                        (work.amounts_rates || []).map((rate, i) =>
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

export default WorksTalbe
