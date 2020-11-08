"use strict";

import Web3 from "web3";

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener("load", function() {
    var web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider);
      web3.eth.net
        .isListening()
        .then(isListening => {
          resolve({
            hasInjectedWeb3: isListening,
            web3
          });
        })
        .catch(error => {
          console.error("Unable to check if connected: " + error);
        });
    } else {
      /* eslint-disable-next-line */
      reject({
        result: null,
        err: "Unable to connect to Web3"
      });
    }
  });
})
  .then(result => {
    // get blockchain network Id
    return new Promise(function(resolve, reject) {
      result.web3.eth.net.getId((err, networkId) => {
        if (err) {
          result = Object.assign({}, result);

          /* eslint-disable-next-line */
          reject({
            result,
            err
          });
        } else {
          networkId = networkId.toString();
          result = Object.assign({}, result, { networkId });
          resolve(result);
        }
      });
    });
  })
  .then(networkIdResult => {
    // get coinbase
    return new Promise(function(resolve, reject) {
      networkIdResult.web3.eth.getCoinbase((err, coinbase) => {
        let result;
        if (err) {
          result = Object.assign({}, networkIdResult);

          /* eslint-disable-next-line */
          reject({
            result,
            err
          });
        } else {
          result = Object.assign({}, networkIdResult, { coinbase });
          resolve(result);
        }
      });
    });
  })
  .then(coinbaseResult => {
    /* eslint-disable no-unused-vars */
    return new Promise(function(resolve, reject) {
      let address = coinbaseResult.web3.eth.defaultAccount;
      let result = Object.assign({}, coinbaseResult, { address });
      resolve(result);
    });
  });

export default getWeb3;
