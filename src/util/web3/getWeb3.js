import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function () {
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider)
      resolve({
        hasInjectedWeb3: web3.isConnected(),
        web3
      })
    } else {
      reject({
        result: null,
        err: 'Unable to connect to Web3'
      })
    }
  })
})
.then((result) => { // get blockchain network Id
  return new Promise(function (resolve, reject) {
    result.web3.version.getNetwork((err, networkId) => {
      if (err) {
        result = Object.assign({}, result)
        reject({
          result,
          err
        })
      } else {
        networkId = networkId.toString()
        result = Object.assign({}, result, { networkId })
        resolve(result)
      }
    })
  })
})
.then((networkIdResult) => { // get coinbase
  return new Promise(function (resolve, reject) {
    networkIdResult.web3.eth.getCoinbase((err, coinbase) => {
      let result
      if (err) {
        result = Object.assign({}, networkIdResult)
        reject({
          result,
          err
        })
      } else {
        result = Object.assign({}, networkIdResult, { coinbase })
        resolve(result)
      }
    })
  })
})
.then((coinbaseResult) => {
  return new Promise(function (resolve, reject) {
    let address = coinbaseResult.web3.eth.defaultAccount
    let result = Object.assign({}, coinbaseResult, { address })
    resolve(result)
  })
})

export default getWeb3
