import { useState, useEffect } from "react";
import { remote } from "electron";

const AddRate = ({ onSubmit, setNewRate, newRate }) => {

    let { name, value } = newRate;

    return (
        <div className="container border-bottom pb-5">
            <h5 className="nav-group-title">Añadir tarifa</h5>
            <form
                className="px-3 py-3"
                onSubmit={onSubmit}>
                <div className="flex">
                    <div className="my-3 px-3 w-1/2 overflow-hidden">

                        <label>Nombre</label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={e => setNewRate({ ...newRate, name: e.target.value })} />

                    </div>
                    <div className="my-3 px-3 w-1/2 overflow-hidden">

                        <label>Valor (€)</label>
                        <input
                            className="form-control"
                            type="number"
                            value={value}
                            onChange={e => setNewRate({ ...newRate, value: parseFloat(e.target.value) })} />

                    </div>
                </div>
                <div className="ml-3 form-actions">
                    <button
                        type="submit"
                        className="btn btn-form btn-primary mt-4">
                        Añadir
                    </button>
                </div>
            </form>
            <style jsx>{`
                .border-bottom {
                    border-bottom: 1px solid #ddd;
                }
            `}</style>
        </div>
    )
}

export default AddRate