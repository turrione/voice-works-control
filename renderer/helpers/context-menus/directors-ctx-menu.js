const directorsCtxMenu = (Menu, MenuItem, setStudios, director) => {
    let { remote } = require('electron')
    let directors = remote.getGlobal('directorDB')

    const menu = new Menu()
    menu.append(new MenuItem({
        label: 'Eliminar', click() {
            directors.deleteOne(director)
            directors.readAll()
                .then(directorsDB => {
                    setStudios(directorsDB);
                });
        }
    }))

    return menu;
}

export default directorsCtxMenu;