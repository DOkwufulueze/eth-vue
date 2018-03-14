import DB from '../../build/contracts/DB.json'
import UserAuthManager from '../../build/contracts/UserAuthManager.json'
import blockchainManager from './BlockchainManager'
import {getObjectFromResponse, getSlicedAddressString, getSoliditySha3ForId, getGravatarFor} from './utilities'

let userManager = null

class UserManager {
  constructor () {
    userManager = userManager || this
    return userManager
  }

  getContractToUse () {
    return {
      UserAuthManager
    }
  }

  writeData (state = null, data = {}) {
    const blockchainData = Object.assign({}, data)
    const contractToUse = blockchainData.contractIndexToUse ? userManager.getContractToUse()[blockchainData.contractIndexToUse] : null
    const blockchainMethodName = blockchainData.methodName

    delete blockchainData.contractIndexToUse
    delete blockchainData.methodName
    return blockchainManager.querySmartContract({
      contractToUse: contractToUse || UserAuthManager,
      smartContractMethod: blockchainMethodName,
      smartContractMethodParams: (coinbase) => [...(Object.values(blockchainData)), {from: coinbase}],
      state,
      smartContractResolve: result => data,
      smartContractReject: error => error
    })
  }

  login (state = null, userParams = {}) {
    return new Promise((resolve, reject) => {
      const userObject = {}
      const userId = userParams.userId || state.web3.coinbase
      userManager.getUserData(state, userId, userParams)
      .then((result) => {
        Object.assign(userObject, result)
        userManager.refineUserData(userObject, () => {
          resolve(userObject)
        })
      })
      .catch(error => reject(error))
    })
  }

  getUserData (state = null, userId = null, userObject = {}) {
    return blockchainManager.querySmartContract({
      contractToUse: DB,
      smartContractMethod: 'getObjectData',
      smartContractMethodParams: (coinbase) => {
        userId = userId || coinbase
        return [userObject.recordFields || userManager.userRecordFields(state, userId), userObject.recordFieldTypes || userManager.userRecordFieldTypes(), {from: coinbase}]
      },
      state,
      smartContractResolve: result => {
        const userData = getObjectFromResponse(state, result, 1, userObject.keys || userManager.userKeys(), userObject.recordFieldTypes || userManager.userRecordFieldTypes())[0]
        userData.coinbase = userData.coinbase || userId
        return userData
      },
      smartContractReject: (error) => ({
        error,
        isValid: true,
        warningMessage: "We've encountered a problem fetching your information from the blockchain. Please do try again in a few minutes."
      })
    })
  }

  refineUserData (userObject, callback = null) {
    getGravatarFor({
      email: userObject.email,
      coinbase: userObject.coinbase
    })
    .then((avatarCanvas) => {
      userObject.avatarCanvas = avatarCanvas
      if (callback) callback(userObject)
    })
  }

  defaultUserObject () {
    return {
      balance: '0.00',
      coinbase: '',
      email: '',
      firstName: '',
      gravatar: '',
      hasCoinbase: false,
      hasWeb3InjectedBrowser: false,
      isConnectedToApprovedNetwork: false,
      isLoggedIn: false,
      lastName: ''
    }
  }

  userKeys () {
    return [
      'firstName',
      'lastName',
      'email',
      'gravatar'
    ]
  }

  userRecordFields (state, userId) {
    userId = getSlicedAddressString(state, userId)

    return [
      getSoliditySha3ForId(state, 'user/first-name', userId),
      getSoliditySha3ForId(state, 'user/last-name', userId),
      getSoliditySha3ForId(state, 'user/email', userId),
      getSoliditySha3ForId(state, 'user/gravatar', userId)
    ]
  }

  userRecordFieldTypes () {
    // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    return [7, 7, 7, 5]
  }
}

userManager = new UserManager()
export default userManager
