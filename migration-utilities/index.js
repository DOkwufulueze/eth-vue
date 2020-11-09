"use strict";

const contract = require("@truffle/contract");
const DBConfigObject = require("../build/contracts/DB.json");
const DBContract = contract(DBConfigObject);

function ensureDBContractCanSendAsync() {
  if (typeof DBContract.currentProvider.sendAsync !== "function") {
    DBContract.currentProvider.sendAsync = function() {
      return DBContract.currentProvider.send.apply(
        DBContract.currentProvider,
        arguments
      );
    };
  }
}

module.exports = {
  async addPermittedContractToDB(contractAddress, coinbase) {
    const deployedDBContract = await this.getDeployedDBContract();
    const response = await deployedDBContract.addPermittedContract(
      contractAddress,
      {
        from: coinbase
      }
    );

    return response;
  },
  async getDBContractAddress() {
    const deployedDBContract = await this.getDeployedDBContract();
    return deployedDBContract.address;
  },
  async getDeployedDBContract() {
    return await DBContract.deployed();
  },
  init(web3) {
    DBContract.setProvider(web3.currentProvider);
    ensureDBContractCanSendAsync();
  },
  isSuccessfulTransaction(response) {
    return !!(response && response.receipt && response.receipt.transactionHash);
  }
};
