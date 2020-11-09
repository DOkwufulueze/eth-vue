"use strict";

/* eslint-disable no-undef */
const UserAuthManager = artifacts.require("./UserAuthManager.sol");
const deployment = require("../migration-utilities/deployment");

// Deploy eth-vue Smart Contract - UserAuthManager
module.exports = async deployer => {
  try {
    await deployment.runFor(UserAuthManager, deployer, web3);
  } catch (error) {
    console.error(error);
  }
};
