export const apostrophize = function (stringObject) {
  let stringItem = stringObject
  if (stringObject && stringObject.toLowerCase().substr(-1, 1) !== 's') {
    stringItem += "'s"
  } else {
    stringItem += "'"
  }

  return stringItem
}

export const truncate = function (stringObject, limitSize = 14, truncatingString = null) {
  if (stringObject && limitSize !== false && !isNaN(limitSize) && limitSize >= 0 && stringObject.length > limitSize) {
    return `${stringObject.substr(0, limitSize)}${truncatingString || '...'}`
  } else {
    return stringObject
  }
}

export const prependZeroIfNecessary = function (stringObject) {
  if (stringObject.length === 1) {
    return `0${stringObject}`
  }

  return stringObject
}
