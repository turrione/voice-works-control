import Link from "next/link";

const navData = [
    { label: 'Estudios', href: 'studios', icon: 'home' },
    { label: 'Directores', href: 'directors', icon: 'users' },
    { label: 'Convocatorias', href: 'works', icon: 'briefcase' },
    { label: 'Nominas', href: 'payroll', icon: 'doc-text' },
    { label: 'Tarifas', href: 'rates', icon: 'credit-card' }
]

const Navigation = ({ section }) => {
    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">Navegación</h5>
            {
                navData.map(item =>
                    <div key={item.href} className={`nav-group-item ${section === item.href ? ' active' : ''}`}>
                        <span className={"icon icon-" + item.icon}></span>
                        <Link href={`/${item.href}`}>
                            <a>{item.label}</a>
                        </Link>
                    </div>
                )
            }
        </nav>
    )
}

export default Navigation;
