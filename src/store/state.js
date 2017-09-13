export default {
  currentRoute: null,
  web3: {
    address: null,
    coinbase: null,
    error: null,
    instance: null,
    isInjected: false,
    networkId: null
  },
  user: {
    email: '',
    firstName: '',
    lastName: '',
    hasCoinbase: false,
    hasWeb3InjectedBrowser: false,
    isConnectedToApprovedNetwork: false,
    isLoggedIn: false
  }
}
