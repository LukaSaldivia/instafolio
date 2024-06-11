const Controller  = require("./Controller.js");
const model = require('../models/empresas.model.js')

let controller = new Controller(model)

controller.add({'nombre' : 'Luka'})
// controller.delete('Luka')


console.log(controller.get())