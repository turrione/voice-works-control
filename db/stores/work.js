const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const workSchema = require('../schemas/work');

class WorksStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(workSchema);
        const dbPath = `${process.cwd()}/db/works.db`;
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

    readStudioWorks(studio) {
        return this.db.find({ studio });
    }

    readDirectorWorks(director) {
        return this.db.find({ director })
    }

    // archive({_id}) {
    //     return this.db.update({_id}, {$set: {isDone: true}})
    // }
}

module.exports = new WorksStore();