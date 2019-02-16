const contract = require('truffle-contract');
const DBConfigObject = require('../build/contracts/DB.json');

const Setup = artifacts.require("./Setup.sol");
const UserAuthManager = artifacts.require("./UserAuthManager.sol");

const DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

if (typeof DBContract.currentProvider.sendAsync !== "function") {
  DBContract.currentProvider.sendAsync = function() {
    return DBContract.currentProvider.send.apply(
      DBContract.currentProvider, arguments
    );
  };
}

// Deploy eth-vue Smart Contracts using the DB Contract address
module.exports = async (deployer) => {
  try {
    const deployedDBContract = await DBContract.deployed();
    const dbAddress = deployedDBContract.address;
    const coinbase = await web3.eth.getCoinbase();
    let response;

    // Deploy Setup Smart Contract
    await deployer.deploy(Setup, dbAddress);
    const setupAddress = await Setup.address;
    response = await deployedDBContract.addPermittedContract(setupAddress, { from: coinbase });
    console.log(`Add Setup Smart Contract to Permitted contracts list: ${response}`);
    const deployedSetup = await Setup.deployed();
    const setupResponse =  await deployedSetup.setConfig();
    console.log(setupResponse);

    // Deploy UserAuthManager Smart Contract
    await deployer.deploy(UserAuthManager, dbAddress);
    const userAuthManagerAddress = await UserAuthManager.address;
    response = await deployedDBContract.addPermittedContract(userAuthManagerAddress, { from: coinbase });
    console.log(`Add UserAuthManager Smart Contract to Permitted contracts list: ${response}`);
  } catch (error) {
    console.error(error);
  }
};
