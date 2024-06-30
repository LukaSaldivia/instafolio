class Tablizator{
  constructor(){
    this.data = []
    this.idAlias = 'id'
    this.fnHeader = (key) => key
    this.fnBody = (key,value) => value
  }

  getTable(data){
    const thead = this.getTHead(data)
    const tbody = this.getTBody(data)

    const table = `
    <table>
    <thead>
    ${thead}
    </thead>
    <tbody>
    ${tbody}
    </tbody>
    </table>`

    return table.trim()
  }

  getTHead(data){
    let keys = Object.keys(data[0])
    let hrs = ''

    for (const key of keys) {
      if (key.toLowerCase() != 'id') {
        hrs+= `<th>${this.fnHeader(key)}</th>`
      }
    }

    hrs+= `<th></th>`

    return `<tr>${hrs}</tr>`

  }

  getTBody(data){
    let trs = ''
    let tr = ''

    for(const obj of data){
      tr = '<tr>'
      for (const [key,value] of Object.entries(obj)) {
        if (key.toLowerCase() != 'id') {
          tr+=`<td>${this.fnBody(key,value)}</td>`
        }
      }
      tr+=`<td>${obj[this.idAlias]}</td>` // id del obj
      tr+='</tr>'

      trs+=tr
    }

    return trs


  }
}


module.exports = Tablizator