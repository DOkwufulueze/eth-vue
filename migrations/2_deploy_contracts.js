"use strict";

/* eslint-disable no-undef */
const DB = artifacts.require("./DB.sol");

module.exports = function(deployer) {
  deployer.deploy(DB);
};
