pragma solidity 0.4.18;

import "./DB.sol";

/**
 * The Setup contract contains configuration logic
 */
contract Setup is Destructible {
  address public dbAddress;

  function Setup (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function setConfig ()
    external
    onlyOwner
  {
    DB(dbAddress).setUIntValue(keccak256('config/max-user-name-length'), 50);
    DB(dbAddress).setUIntValue(keccak256('config/min-user-name-length'), 2);
    DB(dbAddress).setUIntValue(keccak256('config/max-user-email-length'), 80);
    DB(dbAddress).setUIntValue(keccak256('config/min-user-email-length'), 0);
  }
}
