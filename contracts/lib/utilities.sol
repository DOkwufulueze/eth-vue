pragma solidity 0.4.18;

import "../DB.sol";

/**
 * The utilities library contains all relevant utilities for your Smart Contracts' logic
 */
library utilities {
  function getConfig (address dbAddress, string key) internal view returns (uint) {
    return DB(dbAddress).getUIntValue(keccak256(key));
  }

  /**
  * addArrayItem is overloaded
  */
  function addArrayItem (address dbAddress, string key, string countKey, address val) internal {
    var idx = DB(dbAddress).getUIntValue(keccak256(countKey));
    DB(dbAddress).setAddressValue(keccak256(key, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);
  }

  function addArrayItem (address dbAddress, string key, string countKey, uint val) internal {
    var idx = DB(dbAddress).getUIntValue(keccak256(countKey));
    DB(dbAddress).setUIntValue(keccak256(key, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);
  }
}

