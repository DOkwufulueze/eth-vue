import Web3 from 'web3'

const monitorWeb3 = function (state) {
  const networkId = state.web3.networkId
  const coinbase = state.web3.coinbase
  let web3 = window.web3

  // Checking if browser is Web3-injected (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
  } else {
    console.log('No web3 in browser')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  web3.eth.filter('latest', function (error, result) {
    if (!error) {
      console.log(result)
    }
  })

  web3.eth.filter('pending', function (error, result) {
    if (!error) {
      console.log(result)
    }
  })

  setInterval(() => {
    web3.version.getNetwork((err, newNetworkId) => {
      if (!err && networkId && networkId !== '' && newNetworkId && newNetworkId !== '' && newNetworkId !== networkId) {
        window.location.reload()
      } else {
        web3.eth.getCoinbase((err, newCoinbase) => {
          if (!err && coinbase && coinbase !== '' && newCoinbase && newCoinbase !== '' && newCoinbase !== coinbase) {
            window.location.reload()
          }
        })
      }
    })
  }, 666)
}

export default monitorWeb3
