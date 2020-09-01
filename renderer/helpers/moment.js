import moment from 'moment'

const getLabels = [...new Array(12)].map((i, idx) => moment().locale('es').subtract(idx, 'month').format('MMMM YYYY')).reverse();

const getData = async (studioID) => {
    let { remote } = require('electron')
    let db = remote.getGlobal('workDB')

    let works = await db.readStudioWorks(studioID)
    let result = getLabels.map((label, idx) => works.filter(work => moment(work.date).locale('es').format('MMMM YYYY') === label).length)
    return result
}

const getDirectorWorks = async (directorID) => {
    let { remote } = require('electron')
    let db = remote.getGlobal('workDB')

    let works = await db.readDirectorWorks(directorID)
    let result = getLabels.map((label, idx) => works.filter(work => moment(work.date).locale('es').format('MMMM YYYY') === label).length)
    return result
}

export {
    getLabels,
    getData,
    getDirectorWorks
}