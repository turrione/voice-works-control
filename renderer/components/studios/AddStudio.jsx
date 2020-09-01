const AddStudio = ({ onSubmit }) => {
    return (
        <div className="border-bottom">
            <h5 className="nav-group-title">Crear nuevo estudio</h5>
            <form className="px-3 py-3"
                onSubmit={onSubmit}>
                <div className="flex">
                    <div className="my-3 px-3 w-1/2 overflow-hidden">
                        <input
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="Nombre estudio" />
                    </div>
                    <div className=" px-3 w-1/8">
                        <button
                            type="submit"
                            className="btn btn-form btn-primary mt-4">
                            Añadir estudio
                        </button>
                    </div>
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

export default AddStudio
