const worksNav = [
    { label: 'Añadir convocatoria', icon: 'plus-circled', section: 'add-work' },
    { label: 'Ver convocatorias', icon: 'eye', section: 'see-works' },
]

const WorksNav = ({ data, section, setSection }) => {



    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">Acciones</h5>
            {
                worksNav.map(work =>
                    <span
                        id={`work-${work.section}`}
                        key={work.section}
                        className={"nav-group-item" + `${work.section === section ? ' active' : ''}`}
                        onClick={() => setSection(work.section)}>
                        <span className={"icon icon-" + work.icon}></span>
                        {work.label}
                    </span>
                )
            }
        </nav>
    )
}

export default WorksNav