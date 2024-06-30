const { Model } = require("../models/Model");
const Tablizator = require("../libs/Tablizator")
const Paginator = require("../libs/Paginator");
const { groupBy } = require("../libs/anner_arrays");

class Controller {
  constructor(model = new Model(), tablizator = new Tablizator()){
    this.model = model
    this.tablizator = tablizator
    this.tablizator.idAlias = this.model.idAlias
  }

  get(id = ""){
    return this.model.get(id)
  }

  edit(id = "",body){
    this.model.edit(id,body)
  }

  delete(id = ""){
    this.model.delete(id)
  }

  add(body){
    this.model.add(body)
  }

  
  table(page = 1){

    let fn = (item,params) => true

    let filtered = []
    // filtrar
    filtered = groupBy(this.get(),fn, {})[true]

    // paginar
    let p = new Paginator()
    let paginated = p.paginate(filtered,page)

    // tablizar
    return this.tablizator.getTable(paginated)

  }
}

module.exports = Controller 