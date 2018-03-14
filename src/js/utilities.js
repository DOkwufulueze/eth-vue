import {chunkArray} from '../util/ArrayManager'
import ethereumBlockies from 'ethereum-blockies'
import { avatarCanvasElement } from '../util/DOMManipulator'
import { IDENTICON_COLORS } from '../util/constants'
import soliditySha3 from 'solidity-sha3'

export function getObjectFromResponse (state, result, entitiesCount, keys, fieldTypes) {
  // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
  const dataObject = []
  let itemValue
  const intValues = result[0]
  const stringValues = result[1]
  const entitiesStrings = stringValues.split('666--ETH-VUE-LIST--666').splice(0, stringValues.split('666--ETH-VUE-LIST--666').length - 1)
  const entitiesStringsArrays = entitiesStrings.map(entityStrings => entityStrings.split('666--ETH-VUE--666').splice(0, entityStrings.split('666--ETH-VUE--666').length - 1))
  const intResultCountPerEntity = result[0].length / entitiesCount
  const entitiesIntsArrays = chunkArray(intValues, intResultCountPerEntity)

  for (let i = 0; i < entitiesCount; i++) {
    let intValuesIndex = 0
    let stringValuesIndex = 0
    const entityObject = keys.reduce((hash, key, index) => {
      if (fieldTypes[index] === 1) {
        itemValue = entitiesIntsArrays[i] ? entitiesIntsArrays[i][intValuesIndex].toNumber() : 0
        itemValue = !(itemValue === 0)
        intValuesIndex += 1
      } else if ([2, 3].includes(fieldTypes[index])) {
        itemValue = entitiesIntsArrays[i] ? entitiesIntsArrays[i][intValuesIndex].toNumber() : 0
        intValuesIndex += 1
      } else if (fieldTypes[index] === 4) {
        itemValue = entitiesIntsArrays[i] ? state.web3.instance().toHex(entitiesIntsArrays[i][intValuesIndex].toString()) : '0x0'
        intValuesIndex += 1
      } else if (fieldTypes[index] === 5) {
        itemValue = entitiesIntsArrays[i] ? state.web3.instance().toUtf8(state.web3.instance().toHex(entitiesIntsArrays[i][intValuesIndex].toString())).slice(1) : ''
        intValuesIndex += 1
      } else {
        itemValue = entitiesStringsArrays[i] ? entitiesStringsArrays[i][stringValuesIndex].slice(2) : ''
        stringValuesIndex += 1
      }

      hash[key] = itemValue
      return hash
    }, {})

    dataObject.push(entityObject)
  }

  return dataObject
}

export function getSlicedAddressString (state, addressString) {
  return state.web3.instance().toHex(addressString).slice(2)
}

export function getLeftPaddedNumber (state, numberValue, dataTypeIndex = 1) {
  const hexNumber = state.web3.instance().toHex(numberValue)
  const rightNumber = getSlicedAddressString(state, hexNumber)
  const paddings = [2, 64] // 2 => uint8, 64 => uint256
  const numberOfDigits = rightNumber.toString().length
  const paddingSize = paddings[dataTypeIndex] - numberOfDigits
  let paddedNumber = '0x'
  for (let i = 0; i < paddingSize; i++) {
    paddedNumber += '0'
  }

  paddedNumber += rightNumber.toString()
  paddedNumber = paddedNumber.slice(0, (2 + paddings[dataTypeIndex]))
  return paddedNumber
}

export function getSoliditySha3ForId (state, key, ...otherParams) {
  return soliditySha3(`${state.web3.instance().toHex(key)}${otherParams.join('')}`)
}

export function getHash (stringValue = '') {
  let hash = 0
  let characterCode

  if (stringValue.length === 0) return hash

  for (let i = 0; i < stringValue.length; i++) {
    characterCode = stringValue.charCodeAt(i)
    hash = ((hash << 5) - hash) + characterCode
    hash |= 0 // Convert to 32-bit integer
  }

  return hash
}

export function getGravatarFor (payload = {}) {
  return new Promise(function (resolve, reject) {
    if (payload.email && payload.email.trim() !== '') {
      getGravatarFromEmail(payload, resolve, reject)
    } else {
      getGravatarFromCoinbase(payload, resolve, reject)
    }
  })
}

export function getGravatarFromEmail (payload = {}, resolve, reject) {
  avatarCanvasElement(payload.email)
  .then((avatarCanvas, gravatar) => {
    resolve(avatarCanvas)
  })
}

export function getGravatarFromCoinbase (payload = {}, resolve, reject) {
  const colorPosition = Math.abs(getHash(payload.coinbase) % IDENTICON_COLORS.length)
  const identiconColor = IDENTICON_COLORS[colorPosition]
  const avatarCanvas = ethereumBlockies.create({
    seed: payload.coinbase.toString(),
    color: identiconColor.color,
    bgcolor: identiconColor.bgColor,
    size: 8,
    scale: 13,
    spotcolor: identiconColor.spotColor
  })
  resolve(avatarCanvas)
}
