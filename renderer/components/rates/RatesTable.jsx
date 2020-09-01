const RatesTable = ({ rates }) => {
    return (

        <div className="pane padded-bottom-more">
            <table className="table-striped">
                <thead>
                    <tr>
                        <th>Nombre tarifa</th>
                        <th>Importe</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rates.map(rate =>
                            <tr key={rate._id}>
                                <td>{rate.name}</td>
                                <td>{rate.value}€</td>
                                <td>acciones</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default RatesTable
