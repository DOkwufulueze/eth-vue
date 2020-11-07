export default {
  currentRoute: null,
  currentView: null,
  web3: {
    address: null,
    coinbase: null,
    error: null,
    instance: null,
    isInjected: false,
    networkId: null
  },
  user: {
    balance: "0.00",
    coinbase: "",
    email: "",
    firstName: "",
    gravatar: "",
    hasCoinbase: false,
    hasWeb3InjectedBrowser: false,
    isConnectedToApprovedNetwork: false,
    isLoggedIn: false,
    lastName: ""
  },
  isDAppReady: false,
  isValidUserBut: "0",
  originalIsValidUserBut: "0"
};
