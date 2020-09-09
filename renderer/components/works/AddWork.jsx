import { useState, useEffect } from "react";

const AddWork = ({ create, studios, rates, directors }) => {

    let [newWork, setNewWork] = useState({
        product: '',
        amounts_rates: null,
        date: new Date().toLocaleDateString(),
        studio: '',
        director: ''
    })
    let [actualRate, setActualRate] = useState({ rate: '', amount: 0 })

    // Push rates
    let addRates = () => {
        if (actualRate.rate && actualRate.amount > 0) {
            let currentRates = newWork.amounts_rates || []
            currentRates.push(actualRate)
            setNewWork({ ...newWork, amounts_rates: currentRates })
            setActualRate({ rate: '', amount: 0 })
        }
    }

    let onSubmit = (e) => {
        e.preventDefault()
        create(newWork, 'workDB')
        setNewWork({
            product: '',
            amounts_rates: null,
            date: new Date().toLocaleDateString(),
            studio: '',
            director: ''
        })
    }

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
                        value={newWork.product}
                        onChange={e => setNewWork({ ...newWork, product: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Estudio</label>
                    <select
                        className="form-control"
                        onChange={e => setNewWork({ ...newWork, studio: e.target.value })}>
                        <option defaultValue="Sin estudio">Selecciona un estudio</option>
                        {
                            studios.map(studio =>
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
                        <option defaultValue="Sin director">Selecciona un director</option>
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
                        value={newWork.date}
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
                                <option defaultValue="Selecciona una tarifa">Selecciona una tarifa</option>
                                {
                                    rates.map(rate =>
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
                    newWork.amounts_rates &&
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>Nombre tarifa</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (newWork.amounts_rates || []).map(rate =>
                                    <tr key={rate.rate}>
                                        <td>{rates.filter((rt) => rt._id === rate.rate)[0]?.name}</td>
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
