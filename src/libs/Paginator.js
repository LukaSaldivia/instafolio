class Paginator {
  constructor(itemsPerPage = 10){
    this.arr = []
    this.page = 1
    this.itemsPerPage = itemsPerPage
    this.totalPages

  }

  paginate(arr = [],page = 1){
    this.arr = arr
    this.page = Math.max(page,1)

    this.arr.length = Math.min(this.page * this.itemsPerPage, this.arr.length);
    this.arr.splice(0,this.itemsPerPage*(this.page-1))

    return this.arr
  }

  get totalPages(){
    return Math.ceil(this.arr.length / this.itemsPerPage)
  }
  
  get totalItems(){
    return this.arr.length
  }
}

module.exports = Paginator