import { MUTATION_TYPES, APPROVED_NETWORK_ID } from '../util/constants'

function resetUser (state, web3Status) {
  const user = {
    firstName: '',
    lastName: '',
    email: '',
    isLoggedIn: false
  }

  Object.assign(user, web3Status)
  state.user = user
}

export default {
  [MUTATION_TYPES.REGISTER_WEB3_INSTANCE] (state, payload) {
    const result = payload.result

    const web3Copy = state.web3
    web3Copy.instance = () => result.web3
    web3Copy.address = result.address
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.error = result.web3Error
    web3Copy.isInjected = result.hasInjectedWeb3

    state.web3 = web3Copy

    if (payload.callback) payload.callback(state)
  },
  [MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] (state) {
    const hasWeb3InjectedBrowser = state.web3.isInjected
    const hasCoinbase = !!(state.web3.coinbase && state.web3.coinbase !== '')
    const isConnectedToApprovedNetwork = !!(state.web3.networkId && state.web3.networkId !== '' && state.web3.networkId === APPROVED_NETWORK_ID)
    const web3Status = {
      hasWeb3InjectedBrowser,
      hasCoinbase,
      isConnectedToApprovedNetwork
    }

    if (hasWeb3InjectedBrowser && hasCoinbase && isConnectedToApprovedNetwork) {
      const userCopy = state.user
      Object.assign(userCopy, web3Status)
      state.user = userCopy
    } else {
      resetUser(state, web3Status)
    }
  },
  [MUTATION_TYPES.LOGIN] (state, payload) {
    const userData = payload.userData
    const userCopy = state.user

    Object.assign(userCopy, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      isLoggedIn: !!(userData.email && userData.email !== '') && state.user.hasCoinbase && state.user.isConnectedToApprovedNetwork
    })

    state.user = userCopy

    if (payload.callback) payload.callback(userData)
  },
  [MUTATION_TYPES.LOGOUT] (state, payload) {
    resetUser(state)
    if (payload.callback) payload.callback()
  },
  [MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO] (state, newRoute) {
    state.currentRoute = newRoute
  }
}
