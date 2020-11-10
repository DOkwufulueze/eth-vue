import contract from "@truffle/contract";
import DB from "../../build/contracts/DB.json";
import { APPROVED_NETWORK_ID, NETWORKS } from "../util/constants";
import soliditySha3 from "solidity-sha3";

let blockchainManager = null;

class BlockchainManager {
  constructor() {
    blockchainManager = blockchainManager || this;
    return blockchainManager;
  }

  getCurrentContractAddressForKey(dbContractKey, state, coinbase) {
    return new Promise((resolve, reject) => {
      const DBContract = contract(DB);
      DBContract.setProvider(state.web3.instance().currentProvider);
      DBContract.deployed()
        .then(contractInstance => {
          contractInstance
            .getAddressValue(soliditySha3(dbContractKey), { from: coinbase })
            .then(result => {
              // Successful Fetch
              resolve(result);
            })
            .catch(error => {
              /* eslint-disable-next-line */
              reject({ error, isValid: true, warningMessage: "We're unable to get the current contract address from the blockchain. Please do try again in a few minutes." })
            });
        })
        .catch(error => {
          /* eslint-disable-next-line */
          reject({ error, isValid: true, warningMessage: "We couldn't find Eth-Vue Smart Contracts on your detected network. This is because the Smart Contracts aren't deployed there." })
        });
    });
  }

  accessBlockChainWith(dataObject = {}) {
    const state = dataObject.state;
    return new Promise((resolve, reject) => {
      if (!state || !state.web3 || !state.web3.instance) {
        /* eslint-disable-next-line */
        reject({ error: true, warningMessage: 'Web3 is not initialised. Use a Web3 injector' })
      } else {
        const approvedNetworkId = APPROVED_NETWORK_ID || state.web3.networkId;
        if (state.web3.networkId === approvedNetworkId) {
          const contractToUse = dataObject.contractToUse;
          let ethVueContract = contract(contractToUse);
          ethVueContract.setProvider(state.web3.instance().currentProvider);
          state.web3.instance().eth.getCoinbase((error, coinbase) => {
            if (error) {
              /* eslint-disable-next-line */
              reject({ error, warningMessage: 'Unable to get coinbase for this operation' })
            } else {
              blockchainManager.runBlockchainPromise(resolve, reject, {
                ethVueContract,
                method: dataObject.method,
                coinbase
              });
            }
          });
        } else {
          /* eslint-disable-next-line */
          reject({ error: true, warningMessage: `You're not on the same blockchain as us. Please connect to the ${NETWORKS[APPROVED_NETWORK_ID]}` })
        }
      }
    });
  }

  runBlockchainPromise(resolve, reject, dataObject) {
    dataObject.ethVueContract
      .deployed()
      .then(contractInstance => {
        dataObject
          .method(contractInstance, dataObject.coinbase)
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject({
          error,
          isValid: true,
          warningMessage:
            "We couldn't find Eth-Vue Smart Contracts on your detected network. This is because the Smart Contracts aren't deployed there."
        });
      });
  }

  /**
   *
   * @param {*} query the payload to use in identifying and
   * querying the smartcontract ABI. This payload contains
   *   - the eth-vue state object
   *   - the contract we're sending the message to
   *   - db contract key
   *   - the method callback
   *   - the smart contract method to call
   *   - the smart contract method parameters
   *   - the callback for Promise resolution
   *   - the callback for Promise rejection
   */
  querySmartContract(query) {
    return new Promise((resolve, reject) => {
      blockchainManager
        .accessBlockChainWith({
          state: query.state,
          contractToUse: query.contractToUse,
          dbContractKey: query.dbContractKey,
          method:
            query.method ||
            ((contractInstance, coinbase) => {
              return new Promise((resolve, reject) => {
                contractInstance[query.smartContractMethod](
                  ...query.smartContractMethodParams(coinbase)
                )
                  .then(result => {
                    // Successful Fetch
                    resolve(query.smartContractResolve(result));
                  })
                  .catch(error => {
                    reject(query.smartContractReject(error));
                  });
              });
            })
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

blockchainManager = new BlockchainManager();
export default blockchainManager;
