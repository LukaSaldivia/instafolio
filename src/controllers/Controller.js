const { Model } = require("../models/Model");
const Tablizator = require("../libs/Tablizator")

class Controller {
  constructor(model = new Model()){
    this.model = model
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

  
  table(){
    let t = new Tablizator(this.get(),this.model.idAlias)

    return t.getTable()
  }
}

module.exports = Controller 