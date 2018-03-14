var contract = require('truffle-contract');
var DBConfigObject = require('../build/contracts/DB.json');

var Setup = artifacts.require("./Setup.sol");
var UserAuthManager = artifacts.require("./UserAuthManager.sol");

var DBContract = contract(DBConfigObject);
DBContract.setProvider(web3.currentProvider);

var dbAddress = DBContract.deployed()
.then(function (instance) {
  return instance.address;
})
.catch(function (error) {
  console.log(':::::::Unable to get deployed DB')
});

// Deploy eth-vue Smart Contracts using the DB Contract address
module.exports = function (deployer) {
  deployer.deploy(Setup, dbAddress).then(function () {
    dbAddress.then(function (value) {
      var setupAddress = Setup.address;

      DBContract.at(value).addPermittedContract(setupAddress, { from: web3.eth.coinbase })
      .then(function (res) {
        console.log(res);
        Setup.at(setupAddress).setConfig()
        .then(function (setupRes) {
          console.log(setupRes);
        })
        .catch(function (error) {
          console.error(error);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    })
    .catch(function (error) {
      console.log(':::::::Unable to get deployed DB address')
    });
  });

  deployer.deploy(UserAuthManager, dbAddress).then(function () {
    dbAddress.then(function (value) {
      var userAuthManagerAddress = UserAuthManager.address;

      DBContract.at(value).addPermittedContract(userAuthManagerAddress, { from: web3.eth.coinbase })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.error(error);
      });
    })
    .catch(function (error) {
      console.log(':::::::Unable to get deployed DB address')
    });
  });
};
