var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

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

// Deploy Authentication using the DB Contract address
module.exports = function (deployer) {
  deployer.deploy(Authentication, dbAddress);
};
