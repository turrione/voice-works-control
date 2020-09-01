
const StudiosNav = ({ data, section, setSection }) => {
    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">Estudios</h5>
            {
                data.map(studio =>
                    <span
                        id={`studio-${studio._id}`}
                        key={studio._id}
                        className={"nav-group-item" + `${studio._id === section ? ' active' : ''}`}
                        onClick={() => setSection(studio._id)}>
                        <span className="rounded-full mr-2 font-bold items-center justify-center bg-gray-300">
                            <span>
                                {studio.name.substring(0, 2).toUpperCase()}
                            </span>
                        </span>
                        {studio.name}
                    </span>
                )
            }
        </nav>
    )
}

export default StudiosNav