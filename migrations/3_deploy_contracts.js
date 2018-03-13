var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var Setup = artifacts.require("./Setup.sol");
var Authentication = artifacts.require("./Authentication.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function(instance) {
  return instance.address;
})
.catch(function(error) {
  console.log(':::::::Unable to get deployed DB')
});

// Deploy eth-vue Smart Contracts using the DB Contract address
module.exports = function (deployer) {
  deployer.deploy(Setup, dbAddress);
  deployer.deploy(Authentication, dbAddress);
};
