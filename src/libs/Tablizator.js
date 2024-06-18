class Tablizator{
  constructor(data, idAlias = 'id',fn = (key,value) => value){
    this.data = data
    this.idAlias = idAlias
    this.fn = fn
  }

  getTable(){
    const thead = this.getTHead()
    const tbody = this.getTBody()

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

  getTHead(){
    let keys = Object.keys(this.data[0])
    let hrs = ''

    for (const key of keys) {
      if (key.toLowerCase() != 'id') {
        hrs+= `<th>${key}</th>`
      }
    }

    hrs+= `<th></th>`

    return `<tr>${hrs}</tr>`

  }

  getTBody(){
    let trs = ''
    let tr = ''

    for(const obj of this.data){
      tr = '<tr>'
      for (const [key,value] of Object.entries(obj)) {
        if (key.toLowerCase() != 'id') {
          tr+=`<td>${this.fn(key,value)}</td>`
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