"use strict";

const DB = artifacts.require("./DB.sol");

module.exports = function(deployer) {
  deployer.deploy(DB);
};
