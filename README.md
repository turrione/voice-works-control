# Voice Work Control
Aplicación de escritorio *(**open source**)* multiplataforma *(`windows, macOs`)* para que los profesionales de la voz *(**actores y directores de doblaje, locutores y cantantes**)* puedan tener control exhaustivo de sus trabajos.

 - 🔐  **Nadie sin acceso a tu ordenador puede acceder a tus datos.** Sin servidor, la base de datos se instala en tu ordenador y cualquier dato que introduzcas se guarda en la carpeta `db` en la capeta raíz de la instalación del software.
 
 - 💼 Añade los **trabajos** que vayas realizando
 
 - 💰 Añade las **tarifas** con las que trabajas

 - 🏢 Añade **estudios** de grabación

 - 👥 Añade **directores**

 - 📊 Obtén gráficas de trabajos por estudios, trabajos por director y facturación mensual.
 - 📐 Ten control de todos tus datos. Tus datos se muestran en tablas y se puede filtrar por diferentes campos para que encuentres lo que estás buscando fácilmente.

 - 💶 Vé y exporta tus nóminas brutas y observa cómo van aumentando los importres de las nóminas del mes actual.

 - 🔴 Para mayor control, puedes exportar todos tus datos en `xls`, o `xlsx`
 
 ## Enlaces de descarga
 
 - [Windows]()
 - [macOs]()

## Uso
Este software ha sido desarrollado con [Elecrtron.js](https://github.com/electron/electron) en el proceso principal y con [Next.js](https://github.com/vercel/next.js) en el proceso de renderizado. Para dar estilos a la interfaz del usuario se ha usado [Photonkit](http://photonkit.com/) y [TailwindCSS](https://tailwindcss.com/).

### Instalación de dependencias

```zsh
# usando yarn o npm
$ yarn (or `npm install`)
```

### Úsalo

```zsh
# development mode
$ yarn dev (or `npm run dev`)

# production build
$ yarn build (or `npm run build`)