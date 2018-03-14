import { ACTION_TYPES, MUTATION_TYPES } from '../util/constants'
import getWeb3 from '../util/web3/getWeb3'

export default {
  [ACTION_TYPES.REGISTER_WEB3_INSTANCE] ({ state, commit }) {
    return new Promise(function (resolve, reject) {
      getWeb3
      .then((result) => {
        commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, {
          result,
          callback: (state) => {
            resolve({ state })
          }
        })
      })
      .catch((error) => {
        if (!(state && state.web3 && state.web3.instance)) {
          const result = error.result
          commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, {
            result: {
              web3: (result && result.hasInjectedWeb3 ? result.web3 : null),
              hasInjectedWeb3: (result && result.hasInjectedWeb3 ? result.hasInjectedWeb3 : false),
              web3Error: error.error
            },
            callback: (state) => {
              reject({ state, error })
            }
          })
        }
      })
    })
  },
  [ACTION_TYPES.SET_CURRENT_VIEW] ({ commit }, newRoute) {
    commit(MUTATION_TYPES.SET_CURRENT_VIEW, newRoute)
  },
  [ACTION_TYPES.UPDATE_USER_GRAVATAR] ({ commit }, payload) {
    commit(MUTATION_TYPES.UPDATE_USER_GRAVATAR, payload)
  },
  [ACTION_TYPES.UPDATE_DAPP_READINESS] ({ commit }, isReady) {
    commit(MUTATION_TYPES.UPDATE_DAPP_READINESS, isReady)
  },
  [ACTION_TYPES.INITIALISE_IS_VALID_USER_BUT] ({ commit }, value) {
    return new Promise(function (resolve, reject) {
      commit(MUTATION_TYPES.INITIALISE_IS_VALID_USER_BUT, {
        value,
        callback: () => resolve()
      })
    })
  },
  [ACTION_TYPES.SET_IS_VALID_USER_BUT] ({ commit }, newValue) {
    commit(MUTATION_TYPES.SET_IS_VALID_USER_BUT, newValue)
  },
  [ACTION_TYPES.RESET_IS_VALID_USER_BUT] ({ commit }) {
    commit(MUTATION_TYPES.RESET_IS_VALID_USER_BUT)
  },
  [ACTION_TYPES.UPDATE_WEB3_PROPERTIES] ({ commit }, payload) {
    commit(MUTATION_TYPES.UPDATE_WEB3_PROPERTIES, payload)
  },
  [ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS] ({ commit }) {
    return new Promise(function (resolve, reject) {
      commit(MUTATION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS, {
        callback: (result) => {
          result.status ? resolve() : reject(result)
        }
      })
    })
  },
  [ACTION_TYPES.LOGIN] ({ commit }, payload) {
    return new Promise(function (resolve, reject) {
      commit(MUTATION_TYPES.LOGIN, {
        userObject: payload.userObject,
        callback: (status) => {
          status ? resolve() : reject()
        }
      })
    })
  },
  [ACTION_TYPES.LOGOUT] ({ commit }) {
    return new Promise(function (resolve, reject) {
      commit(MUTATION_TYPES.LOGOUT, {
        callback: () => resolve()
      })
    })
  },
  [ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO] ({ commit }, newRoute) {
    commit(MUTATION_TYPES.CHANGE_CURRENT_ROUTE_TO, newRoute)
  }
}
