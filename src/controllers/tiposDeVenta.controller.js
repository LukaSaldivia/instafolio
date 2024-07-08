const Controller  = require("./Controller.js");
const model = require('../models/tiposDeVenta.model.js')
const Tablizator = require('../libs/Tablizator.js')

let controller = new Controller(model, new Tablizator(), '#55DA20')

module.exports = controller