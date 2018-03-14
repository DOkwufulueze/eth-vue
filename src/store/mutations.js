import ethereumBlockies from 'ethereum-blockies'
import { avatarCanvasElement } from '../util/DOMManipulator'
import { MUTATION_TYPES, APPROVED_NETWORK_ID, IDENTICON_COLORS, NETWORKS } from '../util/constants'

function resetUser (state, web3Status = {}) {
  const user = {
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

  const userCopy = state.user
  Object.assign(userCopy, user, web3Status)
  state.user = userCopy
}

function getHash (stringValue) {
  let hash = 0
  let characterCode

  if (stringValue) {
    if (stringValue.length === 0) return hash

    for (let i = 0; i < stringValue.length; i++) {
      characterCode = stringValue.charCodeAt(i)
      hash = ((hash << 5) - hash) + characterCode
      hash |= 0 // Convert to 32-bit integer
    }
  }

  return hash
}

function assignPropertyTo (hashObject, key, value) {
  Object.assign(hashObject, {
    [key]: value
  })
}

function getUserBalance (state, userCopy) {
  return new Promise(function (resolve, reject) {
    state.web3.instance().eth.getBalance(state.user.coinbase, (err, res) => {
      if (!err) {
        resolve(state.web3.instance().fromWei(res.toNumber()))
      } else {
        console.error(err)
      }
    })
  })
}

function updateUserGravatar (state, userCopy, payload = null) {
  if (payload.email && payload.email.trim() !== '') {
    setGravatarFromEmail(state, userCopy, payload)
  } else {
    prepareGravatarFromCoinbase(state, userCopy, payload)
  }
}

function setGravatarFromEmail (state, userCopy, payload = null) {
  avatarCanvasElement(payload.email)
  .then((avatarCanvas, gravatar) => {
    assignPropertyTo(userCopy, 'gravatar', gravatar)
    assignPropertyTo(userCopy, 'avatarCanvas', avatarCanvas)
    state.user = userCopy
    if (payload.callback) payload.callback(avatarCanvas)
  })
}

function prepareGravatarFromCoinbase (state, userCopy, payload = null) {
  const colorPosition = Math.abs(getHash(state.web3.coinbase) % IDENTICON_COLORS.length)
  const identiconColor = IDENTICON_COLORS[colorPosition]
  const avatarCanvas = ethereumBlockies.create({
    seed: state.web3.coinbase,
    color: identiconColor.color,
    bgcolor: identiconColor.bgColor,
    size: 8,
    scale: 13,
    spotcolor: identiconColor.spotColor
  })
  assignPropertyTo(userCopy, 'avatarCanvas', avatarCanvas)
  state.user = userCopy
  if (payload.callback) payload.callback(avatarCanvas)
}

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result

    const web3Copy = state.web3
    web3Copy.instance = () => result.web3
    web3Copy.address = result.address ? result.address.toString() : web3Copy.address
    web3Copy.coinbase = result.coinbase ? result.coinbase.toString() : web3Copy.coinbase
    web3Copy.networkId = result.networkId ? result.networkId.toString() : web3Copy.networkId
    web3Copy.error = result.web3Error ? result.web3Error : web3Copy.error
    web3Copy.isInjected = result.hasInjectedWeb3 ? result.hasInjectedWeb3 : web3Copy.isInjected

    state.web3 = web3Copy

    if (payload.callback) payload.callback(state)
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state, payload) {
    const hasWeb3InjectedBrowser = state.web3.isInjected
    const hasCoinbase = !!(state.web3.coinbase && state.web3.coinbase !== '')
    const coinbase = state.web3.coinbase
    const isConnectedToApprovedNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === APPROVED_NETWORK_ID)
    const web3Status = {
      hasWeb3InjectedBrowser,
      hasCoinbase,
      isConnectedToApprovedNetwork,
      coinbase
    }

    let warningMessage = null
    if (hasWeb3InjectedBrowser) {
      if (hasCoinbase) {
        if (!isConnectedToApprovedNetwork) {
          warningMessage = `You're not on the same Blockchain as us. Please connect to the ${NETWORKS[APPROVED_NETWORK_ID]}`
        }
      } else {
        warningMessage = "Looks like you haven't logged into your Web3 injector. If you're using Metamask and you'd signed up, please log into Metamask, else click on the 'Sign Up' link above to begin."
      }
    } else {
      warningMessage = 'Your browser is not Web3-enabled.'
    }

    if (hasWeb3InjectedBrowser && hasCoinbase && isConnectedToApprovedNetwork) {
      const userCopy = state.user
      Object.assign(userCopy, web3Status)
      state.user = userCopy
    } else {
      resetUser(state, web3Status)
    }

    if (payload.callback) payload.callback({status: !warningMessage, warningMessage})
  },
  [MUTATION_TYPES.UPDATE_WEB3_PROPERTIES] (state, payload) {
    for (var i = payload.properties.length - 1; i >= 0; i--) {
      state.web3[payload.properties[i]] = payload.values[i]
      if (state.user[payload.properties[i]]) state.user[payload.properties[i]] = payload.values[i]
    }
  },
  [MUTATION_TYPES.SET_CURRENT_VIEW] (state, newRoute) {
    state.currentView = newRoute.meta.view
  },
  [MUTATION_TYPES.UPDATE_USER_GRAVATAR] (state, payload) {
    const userCopy = state.user
    updateUserGravatar(state, userCopy, payload)
  },
  [MUTATION_TYPES.UPDATE_DAPP_READINESS] (state, isReady) {
    state.isDAppReady = isReady
  },
  [MUTATION_TYPES.INITIALISE_IS_VALID_USER_BUT] (state, payload) {
    state.isValidUserBut = payload.value ? '1' : '0'
    state.originalIsValidUserBut = payload.value ? '1' : '0'
    const userCopy = state.user
    userCopy.warningMessage = payload.value ? payload.value : ''
    state.user = userCopy
    if (payload.callback) payload.callback()
  },
  [MUTATION_TYPES.SET_IS_VALID_USER_BUT] (state, newValue) {
    state.isValidUserBut = newValue
  },
  [MUTATION_TYPES.RESET_IS_VALID_USER_BUT] (state) {
    state.isValidUserBut = state.originalIsValidUserBut
  },
  [MUTATION_TYPES.LOGIN] (state, payload) {
    const userObject = payload.userObject
    const userCopy = state.user

    Object.assign(userCopy, userObject, {
      isValid: true,
      firstName: userObject.firstName || '',
      lastName: userObject.lastName || '',
      email: userObject.email || '',
      gravatar: userObject.gravatar || '',
      isLoggedIn: !!(userObject.email && userObject.email !== '') && state.user.hasCoinbase && state.user.isConnectedToApprovedNetwork
    })

    getUserBalance(state)
    .then((balance) => {
      userCopy.balance = balance
      state.user = userCopy
      if (payload.callback) payload.callback(true)
    })
  },
  [MUTATION_TYPES.LOGOUT] (state, payload) {
    const hasWeb3InjectedBrowser = state.web3.isInjected
    const hasCoinbase = !!(state.web3.coinbase && state.web3.coinbase !== '')
    const coinbase = state.web3.coinbase
    const isConnectedToApprovedNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === APPROVED_NETWORK_ID)
    const web3Status = {
      hasWeb3InjectedBrowser,
      hasCoinbase,
      isConnectedToApprovedNetwork,
      coinbase
    }

    resetUser(state, web3Status)
    if (payload.callback) payload.callback()
  },
  [MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO] (state, newRoute) {
    state.currentRoute = newRoute
  }
}
