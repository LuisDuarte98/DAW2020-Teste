var Batismo = require('../models/batismo');


module.exports.list = () => {
    return Batismo
            .find({},{'_id' : 1, 'date' : 1, 'title' : 1, 'ref' : 1})
            .exec()
}

module.exports.findId = (id) => {
    return Batismo
            .find({'_id': id})
            .exec()
}

module.exports.listTitle = () => {
    return Batismo
            .find({},{'_id': 0, 'title' : 1})
            .exec()
}

module.exports.findByYear = (year) => {
    return Batismo
            .find({'date' : {$regex : ".*" + year + ".*"}})
            .exec()
}


module.exports.listStats = () => {
    return Batismo
            .aggregate([
                { $group: { _id: {$substr: [ "$date",0, 4]} , nr_batizados: { $sum: 1 } } }
            ])
}


module.exports.listProgenitores = () => {
    return Batismo
            .find({}, {'_id' : 1, 'pai' : 1, 'mae' : 1})
            .exec()
}
