"use strict";

const utilities = require("../migration-utilities");

module.exports = {
  async runFor(contractArtifact, deployer, web3, callback = null) {
    utilities.init(web3);
    const coinbase = await web3.eth.getCoinbase();

    // Deploy eth-vue contractArtifact Smart Contract
    const dbAddress = await utilities.getDBContractAddress();
    await deployer.deploy(contractArtifact, dbAddress);
    const contractAddress = await contractArtifact.address;
    const response = await utilities.addPermittedContractToDB(
      contractAddress,
      coinbase
    );

    console.log(
      `Added ${contractArtifact.contractName} Smart Contract to Permitted contracts list: `,
      utilities.isSuccessfulTransaction(response)
    );

    if (callback) callback();
  }
};
