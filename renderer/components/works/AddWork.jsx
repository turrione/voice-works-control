import { useState, useEffect } from "react";
import { remote } from "electron";

let initialWork = {
    product: '',
    amounts_rates: [],
    date: new Date().toLocaleDateString(),
    studio: '',
    director: ''
}

const AddWork = ({ onSubmit, setNewWork, newWork, studios, setStudios, rates, setRates, directors }) => {

    let { product, amounts_rates, date, studio, director } = newWork;
    let [actualRate, setActualRate] = useState({ rate: '', amount: 0 })

    // Push rates
    let addRates = () => {
        if (actualRate.rate && actualRate.amount > 0) {
            let currentRates = amounts_rates
            currentRates.push(actualRate)
            setNewWork({ ...newWork, amounts_rates: currentRates })
            setActualRate({ rate: '', amount: 0 })
        }
    }

    useEffect(() => {
        setNewWork(initialWork)
        return () => setNewWork(initialWork)
    }, [])

    return (
        <div className="container pb-5">
            <h5 className="nav-group-title">Crear nueva convocatoria</h5>
            <form
                className="px-3 py-3"
                onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre producto</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Producto"
                        value={product}
                        onChange={e => setNewWork({ ...newWork, product: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Estudio</label>
                    <select
                        className="form-control"
                        onChange={e => setNewWork({ ...newWork, studio: e.target.value })}>
                        <option selected="selected">Selecciona un estudio</option>
                        {
                            studios.docs.map(studio =>
                                <option key={studio._id} value={studio._id} >{studio.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Director</label>
                    <select
                        className="form-control"
                        onChange={e => setNewWork({ ...newWork, director: e.target.value })}>
                        <option selected="selected">Selecciona un estudio</option>
                        {
                            directors.map(director =>
                                <option key={director._id} value={director._id} >{director.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha</label>
                    <input
                        className="form-control"
                        type="date"
                        value={date}
                        onChange={e => setNewWork({ ...newWork, date: e.target.value })} />
                </div>
                <label>Seleccionar tarifa</label>
                <div className="flex">
                    <div className="my-3 px-3 w-1/2 overflow-hidden">
                        <div className="form-group">
                            <select
                                className="form-control"
                                onChange={e => setActualRate({ ...actualRate, rate: e.target.value })}
                                value={actualRate.rate}>
                                <option selected="selected">Selecciona una tarifa</option>
                                {
                                    rates.docs.map(rate =>
                                        <option key={rate._id} value={rate._id} >{rate.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="my-3 px-3 w-1/2 overflow-hidden">
                        <input
                            className="form-control"
                            type="number"
                            value={actualRate.amount}
                            onChange={e => setActualRate({ ...actualRate, amount: parseInt(e.target.value, 10) })} />
                    </div>
                    <div className="my-3 px-3 w-1/8 overflow-hidden">
                        <span
                            className="icon icon-plus-circled text-lg"
                            onClick={() => addRates()}></span>
                    </div>
                </div>
                {
                    amounts_rates.length > 0 &&
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>Nombre tarifa</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                amounts_rates.map(rate =>
                                    <tr key={rate.rate}>
                                        <td>{rates.docs.filter((rt) => rt._id === rate.rate)[0]?.name}</td>
                                        <td>{rate.amount}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                }
                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-form btn-primary mt-4">
                        Añadir convocatoria
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddWork
