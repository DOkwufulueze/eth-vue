// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "../DB.sol";

/**
 * The utilities library contains all relevant utilities for your Smart Contracts' logic
 */
library utilities {
  function getConfig (address dbAddress, string memory key) internal view returns (uint) {
    return DB(dbAddress).getUIntValue(keccak256(abi.encodePacked(key)));
  }

  /**
  * addArrayItem is overloaded
  */
  function addArrayItem (address dbAddress, string memory key, string memory countKey, address val) internal {
    uint idx = DB(dbAddress).getUIntValue(keccak256(abi.encodePacked(countKey)));
    DB(dbAddress).setAddressValue(keccak256(abi.encodePacked(key, idx)), val);
    DB(dbAddress).setUIntValue(keccak256(abi.encodePacked(key, val, "index")), idx);
    DB(dbAddress).setUIntValue(keccak256(abi.encodePacked(countKey)), idx + 1);
  }

  function addArrayItem (address dbAddress, string memory key, string memory countKey, uint val) internal {
    uint idx = DB(dbAddress).getUIntValue(keccak256(abi.encodePacked(countKey)));
    DB(dbAddress).setUIntValue(keccak256(abi.encodePacked(key, idx)), val);
    DB(dbAddress).setUIntValue(keccak256(abi.encodePacked(key, val, "index")), idx);
    DB(dbAddress).setUIntValue(keccak256(abi.encodePacked(countKey)), idx + 1);
  }
}
