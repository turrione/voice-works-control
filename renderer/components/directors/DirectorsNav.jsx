const DirectorsNav = ({ data, section, setSection }) => {

    let getInitials = (name, elem) => `${name.split(' ').length - 1 >= elem ? name.split(' ')[elem].charAt(0).toUpperCase() : ''}`

    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">Directores</h5>
            {
                data.map(director =>
                    <span
                        id={`director-${director._id}`}
                        key={director._id}
                        className={"nav-group-item" + `${director._id === section ? ' active' : ''}`}
                        onClick={() => setSection(director._id)}>
                        <span className="rounded-full mr-2 font-bold items-center justify-center bg-gray-300">
                            <span>
                                {getInitials(director.name, 0) + getInitials(director.name, 1)}
                            </span>
                        </span>
                        {director.name}
                    </span>
                )
            }
        </nav>
    )
}

export default DirectorsNav