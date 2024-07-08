const { Model } = require("../models/Model");
const Tablizator = require("../libs/Tablizator")
const Paginator = require("../libs/Paginator");
const { groupBy } = require("../libs/anner_arrays");

class Controller {

  static instances = []

  constructor(model = new Model(), tablizator = new Tablizator(), color = "#000000"){
    this.model = model
    this.tablizator = tablizator
    this.tablizator.idAlias = this.model.idAlias
    this.color = color
    Controller.instances.push(this)
  }

  async get(id = ""){
    return await this.model.get(id)
  }

  async edit(id = "",body){
    return await this.model.edit(id,body)
  }

  async delete(id = ""){
    return await this.model.delete(id)
  }

  async add(body){
    return await this.model.add(body)
  }

  
  async table(page = 1){

    let fn = (item,params) => true

    let filtered = []
    // filtrar
    filtered = groupBy(await this.get(),fn, {})[true]

    // paginar
    let p = new Paginator()
    let paginated = p.paginate(filtered,page)

    // tablizar
    return this.tablizator.getTable(paginated)

  }
}

module.exports = Controller 