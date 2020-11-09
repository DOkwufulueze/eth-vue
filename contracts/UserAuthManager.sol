// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import './lib/userManager.sol';
import './DB.sol';

contract UserAuthManager is Destructible {
  address public dbAddress;
  event SetUser(address indexed _userAddress, bool isSetUp);

  constructor (address _dbAddress) {
    require(_dbAddress != address(0x0));
    dbAddress = _dbAddress;
  }

  function setUser (
    string calldata firstName,
    string calldata lastName,
    string calldata email,
    bytes32 gravatar
  )
    external
  {
    userManager.setUser(dbAddress, msg.sender, firstName, lastName, email, gravatar);
    emit SetUser(msg.sender, true);
  }

  function login ()
    external
    view
    returns (bool)
  {
    return userManager.login(dbAddress, msg.sender);
  }
}
