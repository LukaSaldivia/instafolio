const fs = require('fs')
const path = require('path')
const { groupBy , allUniques, getIndex } = require('../libs/anner_arrays')


class Model {


  static DATA = {}
  static readData = (json) => {
    Model.DATA = JSON.parse(fs.readFileSync(path.join(__dirname,'jsons',`${json}.json`),'utf8'))   
  }

  static emptyData = () => {
    Model.DATA = []
  }

  static getData = (json) => {
    Model.readData(json)
    let res = Model.DATA
    Model.emptyData()
    return res
  }

  static getRaw = (json) => {
    Model.readData(json)
    let res = Model.DATA
    Model.emptyData()
    return res
  }

  static postData = (json) => {
    fs.writeFileSync(path.join(__dirname,'jsons',`${json}.json`),JSON.stringify(Model.DATA),'utf8')
    Model.emptyData()
  }

  static updateData = (newer, json) => {
    Model.getRaw(json)
    Model.DATA = newer
    Model.postData(json)
  }

  constructor(json, idAlias = 'id'){
    this.json = json
    this.idAlias = idAlias
  }

  get(id = ''){
    let data = Model.getData(this.json)

    if (id) {
      let map = {}
  
      for (let e of data){
        map[e[this.idAlias]] = {...e}
      }

      return map[id]
      
    }
    return data
  }

  edit(id="", body){
    let data = Model.getData(this.json)
    let index = getIndex(data,id, this.idAlias)
    if (index) {
      Object.assign(data[index],body)
      Model.updateData(data,this.json)
    }
  }

  delete(id=""){
    let data = Model.getData(this.json)
    let index = getIndex(data,id, this.idAlias)
    if (index) {
      data.splice(index,1)
      Model.updateData(data,this.json)
    }
  }

  add(body){
    let data = Model.getData(this.json)
    data.push(body)
    if (allUniques(data,this.idAlias)) {
      Model.updateData(data,this.json)
    }
  }


}

module.exports = Model