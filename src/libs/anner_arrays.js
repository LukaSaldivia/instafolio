function groupBy(arr = [], fn = (item,params) => item, params) {
  let groups = {}

  for(e of arr){
    groups[fn(e,params)] = [...(groups[fn(e,params)] || []), e]

  }

  return groups
}


function allUniques(arr = [], field){
  let map = {}


  for(e of arr){
    map[e[field]] = (map[e[field]] || 0) + 1

    if (map[e[field]] > 1) {
      return false
    }
  }


  return true
}

function getIndex(arr=[],id,idAlias = "id"){
  let map = {}
  for(i in arr)
    map[arr[i][idAlias]] = i

  return map[id]
}

module.exports = { groupBy, allUniques, getIndex}