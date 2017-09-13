import contract from 'truffle-contract'
import AuthContract from '../../build/contracts/Authentication.json'

let auth = null
class Auth {
  constructor () {
    auth = auth || this
    return auth
  }

  editProfile (state = null, data = {}) {
    return new Promise((resolve, reject) => {
      this.accessAuthenticationContractWith({
        state,
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.update(data.firstName, data.lastName, data.email, { from: coinbase })
            .then((result) => {
              // Successful Sign-up
              resolve(data)
            })
            .catch((e) => {
              console.error(e)
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
    })
  }

  signup (state = null, data = {}) {
    return new Promise((resolve, reject) => {
      this.accessAuthenticationContractWith({
        state,
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.signup(data.firstName, data.lastName, data.email, { from: coinbase })
            .then((result) => {
              // Successful Sign-up
              resolve(data)
            })
            .catch((e) => {
              console.error(e)
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
    })
  }

  login (state = null) {
    return new Promise((resolve, reject) => {
      this.accessAuthenticationContractWith({
        state,
        method: (contractInstance, coinbase) => {
          return new Promise((resolve, reject) => {
            contractInstance.login({ from: coinbase })
            .then((result) => {
              // Successful Fetch
              resolve(this.getUTF8DataOfResults(state, result))
            })
            .catch((e) => {
              console.error(e)
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
    })
  }

  accessAuthenticationContractWith (dataObject = {}) {
    const state = dataObject.state
    return new Promise(function (resolve, reject) {
      if (!state || !state.web3 || !(state.web3.instance)) {
        console.log('Web3 is not initialised. Use a Web3 injector')
      } else {
        let authContract = contract(AuthContract)
        authContract.setProvider(state.web3.instance().currentProvider)
        state.web3.instance().eth.getCoinbase((err, coinbase) => {
          if (err) {
            console.err(':::Unable to get coinbase for this operation')
            reject(err)
          } else {
            authContract.deployed()
            .then((contractInstance) => {
              dataObject.method(contractInstance, coinbase)
              .then((result) => {
                resolve(result)
              })
            })
          }
        })
      }
    })
  }

  getUTF8DataOfResults (state, results) {
    const utf8Results = results.map(result => state.web3.instance().toUtf8(result))
    return {
      firstName: utf8Results[0],
      lastName: utf8Results[1],
      email: utf8Results[2]
    }
  }
}

export default new Auth()
