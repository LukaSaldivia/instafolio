const Controller  = require("./Controller.js");
const model = require('../models/categorias.model.js')
const Tablizator = require('../libs/Tablizator.js')

let controller = new Controller(model, new Tablizator(), '#CF8C29')
controller.get().then(console.log)

module.exports = controller