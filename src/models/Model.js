const fs = require('fs')
const path = require('path')
const { groupBy , allUniques, getIndex } = require('../libs/anner_arrays')


class Model {


  static DATA = {}
  static readData = () => {
    Model.DATA = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json'),'utf-8'))    
  }

  static emptyData = () => {
    Model.DATA = {}
  }

  static getData = (jsonObject) => {
    Model.readData()
    let res = Model.DATA[jsonObject]
    Model.emptyData()
    return res
  }

  static getRaw = () => {
    Model.readData()
    let res = Model.DATA
    Model.emptyData()
    return res
  }

  static postData = () => {
    fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify(Model.DATA))
    Model.emptyData()
  }

  static updateData = (newer, jsonObject) => {
    Model.getRaw()
    Model.DATA[jsonObject] = newer
    Model.postData()
  }

  constructor(jsonObject, idAlias = 'id'){
    this.jsonObject = jsonObject
    this.idAlias = idAlias
  }

  get(id = ''){
    let data = Model.getData(this.jsonObject)

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
    let data = Model.getData(this.jsonObject)
    let index = getIndex(data,id, this.idAlias)
    if (index) {
      Object.assign(data[index],body)
      Model.updateData(data,this.jsonObject)
    }
  }

  delete(id=""){
    let data = Model.getData(this.jsonObject)
    let index = getIndex(data,id, this.idAlias)
    if (index) {
      data.splice(index,1)
      Model.updateData(data,this.jsonObject)
    }
  }

  add(body){
    let data = Model.getData(this.jsonObject)
    data.push(body)
    if (allUniques(data,this.idAlias)) {
      Model.updateData(data,this.jsonObject)
    }
  }


}

module.exports = Model