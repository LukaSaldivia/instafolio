const Controller  = require("./Controller.js");
const model = require('../models/empresas.model.js')
const Tablizator = require('../libs/Tablizator.js')

let controller = new Controller(model, new Tablizator(), '#33a089')

module.exports = controller