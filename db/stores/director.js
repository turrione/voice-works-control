const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const directorSchema = require('../schemas/director');

class RateStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(directorSchema);
        const dbPath = `${process.cwd()}/db/directors.db`;
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data) {
        return this.schemaValidator(data);
    }

    create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return this.db.insert(data);
        }
    }

    read(_id) {
        return this.db.findOne({ _id }).exec();
    }

    readAll() {
        return this.db.find();
    }

    deleteOne(id) {
        this.db.remove({ _id: id })
    }

    // readActive() {
    //     return this.db.find({isDone: false}).exec();
    // }

    // archive({_id}) {
    //     return this.db.update({_id}, {$set: {isDone: true}})
    // }
}

module.exports = new RateStore();