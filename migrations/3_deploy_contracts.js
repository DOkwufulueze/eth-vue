"use strict";

/* eslint-disable no-undef */
const Setup = artifacts.require("./Setup.sol");
const deployment = require("../migration-utilities/deployment");

// Deploy eth-vue Smart Contract - Setup
module.exports = async deployer => {
  try {
    await deployment.runFor(Setup, deployer, web3, async () => {
      const deployedSetup = await Setup.deployed();
      const setupResponse = await deployedSetup.setConfig();
      console.log("Setup Config Response: ", setupResponse);
    });
  } catch (error) {
    console.error(error);
  }
};
