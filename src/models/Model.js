const fs = require('fs').promises
const path = require('path')
const { groupBy, allUniques, getIndex } = require('../libs/anner_arrays')

class Model {
  static DATA = {}

  static getFilePath(json) {
    return path.join(__dirname, 'jsons', `${json}.json`)
  }

  static async readData(json) {
    try {
      const data = await fs.readFile(Model.getFilePath(json), 'utf8')
      Model.DATA = JSON.parse(data)
    } catch (err) {
      console.error(`Error reading file: ${err.message}`)
      throw err
    }
  }

  static emptyData() {
    Model.DATA = []
  }

  static async getData(json) {
    await Model.readData(json)
    let res = Model.DATA
    Model.emptyData()
    return res
  }

  static async getRaw(json) {
    await Model.readData(json)
    let res = Model.DATA
    Model.emptyData()
    return res
  }

  static async postData(json) {
    try {
      await fs.writeFile(Model.getFilePath(json), JSON.stringify(Model.DATA), 'utf8')
      Model.emptyData()
    } catch (err) {
      console.error(`Error writing file: ${err.message}`)
      throw err
    }
  }

  static async updateData(newer, json) {
    await Model.getRaw(json)
    Model.DATA = newer
    await Model.postData(json)
  }

  constructor(json, idAlias = 'id') {
    this.json = json
    this.idAlias = idAlias
  }

  async get(id = '') {
    let data = await Model.getData(this.json)

    if (id) {
      let map = {}

      for (let e of data) {
        map[e[this.idAlias]] = { ...e }
      }

      return map[id]
    }
    return data
  }

  async edit(id = "", body) {
    let data = await Model.getData(this.json)
    let index = getIndex(data, id, this.idAlias)
    if (index) {
      Object.assign(data[index], body)
      await Model.updateData(data, this.json)
    }
  }

  async delete(id = "") {
    let data = await Model.getData(this.json)
    let index = getIndex(data, id, this.idAlias)
    if (index) {
      data.splice(index, 1)
      await Model.updateData(data, this.json)
    }
  }

  async add(body) {
    let data = await Model.getData(this.json)
    data.push(body)
    if (allUniques(data, this.idAlias)) {
      await Model.updateData(data, this.json)
    }
  }
}

module.exports = Model
