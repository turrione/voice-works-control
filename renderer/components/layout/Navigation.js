
const Navigation = () => {
    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">Navegación</h5>
            <a className="nav-group-item active">
                <span className="icon icon-home"></span>
                Estudios
            </a>
            <span className="nav-group-item">
                <span className="icon icon-download"></span>
                Directores
            </span>
            <span className="nav-group-item">
                <span className="icon icon-folder"></span>
                Convocatorias
            </span>
            <span className="nav-group-item">
                <span className="icon icon-signal"></span>
                Takes
            </span>
            <span className="nav-group-item">
                <span className="icon icon-print"></span>
                Nominas
            </span>
            <span className="nav-group-item">
                <span className="icon icon-cloud"></span>
                Calendario
            </span>
        </nav>
    )
}

export default Navigation;
