let directorData = (director, works, rates, studios) => {
    let directorWorks = works.filter(work => work.director === director._id)
    let studioName = (work) => studios.filter(studio => work.studio === studio._id)[0].name
    let rateName = (rate) => rates.filter(rt => rt._id === rate)[0].name
    return directorWorks.reduce((result, work) => {
        if (result.studios.indexOf(studioName(work)) === -1) result.studios.push(studioName(work))
        work.amounts_rates.forEach(a_r => {
            if (result.rates_amounts.filter(resA_r => resA_r.rate === rateName(a_r.rate)).length <= 0) {
                // rate not exist / añadir rate i sumar amount
                result.rates_amounts.push({
                    rate: rateName(a_r.rate),
                    amount: a_r.amount
                })
            } else {
                // rate exist / sumar a la cuenta
                let index = result.rates_amounts.map(e => {
                    return e.rate;
                }).indexOf(rateName(a_r.rate));

                result.rates_amounts[index].amount += a_r.amount
            }
        })

        // result.money += rates.reduce((qty, rate) => {
        //     result.rates_amounts.forEach(rt_am => {
        //         if (rt_am.rate === rate.name) {
        //             qty += rate.value * rt_am.amount
        //         }
        //     })
        //     return qty
        // }, 0)

        return result
    }, {
        studios: [],
        rates_amounts: [],
        // money: 0
    })
}

const getDirectorPayroll = (rates, rates_amounts) => rates.reduce((result, rate) => {
    rates_amounts.forEach(rt_am => {
        if (rt_am.rate === rate.name) {
            // console.log(rate.value, rt_am.amount, rt_am)
            result += rate.value * rt_am.amount
        }
    })
    return result
}, 0)

export {
    directorData,
    getDirectorPayroll
};