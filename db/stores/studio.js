const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const studioSchema = require('../schemas/studio');

class StudioStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(studioSchema);
        const dbPath = `${process.cwd()}/db/studios.db`;
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

    archive(_id, update) {
        return this.db.update({ _id }, { $set: { ...update } })
    }
}

module.exports = new StudioStore();