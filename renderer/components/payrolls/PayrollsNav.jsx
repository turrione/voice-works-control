const PayrollsNav = ({ months, section, setSection }) => {

    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">Meses</h5>
            {
                months.map(month =>
                    <span
                        key={month}
                        className={"nav-group-item capitalize" + `${month === section ? ' active' : ''}`}
                        onClick={() => setSection(month)}>
                        <span className={"icon icon-calendar"}></span>
                        {month}
                    </span>
                )
            }
        </nav>
    )
}

export default PayrollsNav