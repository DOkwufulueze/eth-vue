import Web3 from 'web3'
import store from '../../store/'
import { ACTION_TYPES, APPROVED_NETWORK_ID } from '../../util/constants.js'

const monitorWeb3 = function (state) {
  let networkId = state && state.web3 ? state.web3.networkId : ''
  let coinbase = state && state.web3 ? state.web3.coinbase : ''
  let web3 = window.web3
  let isLocalWeb3 = false

  // Checking if browser is Web3-injected (Mist/MetaMask)
  if (typeof web3 !== 'undefined' && web3) {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
  } else {
    console.log('monitorWeb3: No web3 in browser')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    isLocalWeb3 = true
  }

  if (web3) {
    web3.eth.filter('latest', function (error, result) {
      if (!error) {
        // console.log(result)
      }
    })

    web3.eth.filter('pending', function (error, result) {
      if (!error) {
        // console.log(result)
      }
    })
  }

  setInterval(() => {
    if (web3 && !isLocalWeb3) {
      web3.version.getNetwork((err, newNetworkId) => {
        newNetworkId = !err && newNetworkId ? newNetworkId.toString() : ''
        if ((!err && newNetworkId && newNetworkId !== '' && newNetworkId !== networkId) || (!newNetworkId && networkId)) {
          store.dispatch(ACTION_TYPES.LOGOUT)
          window.location.reload()
        } else {
          web3.eth.getCoinbase((err, newCoinbase) => {
            newCoinbase = !err && newCoinbase ? newCoinbase.toString() : ''
            if ((!err && newCoinbase && newCoinbase !== '' && newCoinbase !== coinbase && newNetworkId === APPROVED_NETWORK_ID) || (!newCoinbase && coinbase)) {
              store.dispatch(ACTION_TYPES.LOGOUT)
              window.location.reload()
            } else if (!err && newCoinbase && newCoinbase !== '' && newCoinbase !== coinbase) {
              coinbase = newCoinbase
              store.dispatch(ACTION_TYPES.UPDATE_WEB3_PROPERTIES, {
                properties: ['coinbase'],
                values: [ newCoinbase ]
              })
            }
          })
        }
      })
    }
  }, 666)
}

export default monitorWeb3
