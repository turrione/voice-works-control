const studioCtxMenu = (Menu, MenuItem, setStudios, studio) => {
    let { remote } = require('electron')
    let studiosCollection = remote.getGlobal('db')

    const menu = new Menu()
    menu.append(new MenuItem({
        label: 'Eliminar', click() {
            studiosCollection.deleteOne(studio)
            studiosCollection.readAll()
                .then(studiosDB => {
                    console.log(studiosDB);
                    setStudios(studiosDB);
                });
        }
    }))

    return menu;
}

export default studioCtxMenu;