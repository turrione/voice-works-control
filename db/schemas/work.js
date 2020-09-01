const work = {
    type: 'object',
    product: {
        type: 'string',
        default: 'Sin definir'
    },
    amounts_rates: [{
        rate: {
            type: 'string'
        },
        amount: {
            type: 'number'
        }
    }],
    date: {
        type: 'number',
        default: new Date().getTime()
    },
    studio: {
        type: 'string',
        default: 'Sin especificar'
    },
    director: {
        type: 'string',
        default: 'Sin director'
    }
};

module.exports = work;