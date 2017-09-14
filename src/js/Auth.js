import contract from 'truffle-contract'
import AuthContract from '../../build/contracts/Authentication.json'
import { NETWORKS } from '../util/constants'

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
              reject(e)
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
              reject(e)
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
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
              reject(e)
            })
          })
        }
      })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  accessAuthenticationContractWith (dataObject = {}) {
    const state = dataObject.state
    return new Promise(function (resolve, reject) {
      if (!state || !state.web3 || !(state.web3.instance)) {
        reject('Web3 is not initialised. Use a Web3 injector')
      } else {
        if (state.web3.networkId === NETWORKS.approvedBlockchainNetwork) {
          let authContract = contract(AuthContract)
          authContract.setProvider(state.web3.instance().currentProvider)
          state.web3.instance().eth.getCoinbase((err, coinbase) => {
            if (err) {
              console.error(':::Unable to get coinbase for this operation')
              reject(err)
            } else {
              authContract.deployed()
              .then((contractInstance) => {
                dataObject.method(contractInstance, coinbase)
                .then((result) => {
                  resolve(result)
                })
                .catch((err) => {
                  reject(err)
                })
              })
              .catch((err) => {
                reject(err)
              })
            }
          })
        } else {
          reject(`You are NOT connected to the ${NETWORKS[NETWORKS.approvedBlockchainNetwork]} on which this dApp runs.`)
        }
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
