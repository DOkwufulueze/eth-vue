pragma solidity 0.5.0;

import './lib/userManager.sol';

contract UserAuthManager is Destructible {
  address public dbAddress;
  event SetUser(address indexed _userAddress, bool isSetUp);

  constructor (address _dbAddress) public {
    require(_dbAddress != address(0x0));
    dbAddress = _dbAddress;
  }

  function login ()
    external
    view
    returns (bool)
  {
    return userManager.login(dbAddress, msg.sender);
  }

  function setUser (
    string calldata firstName,
    string calldata lastName,
    string calldata email,
    bytes32 gravatar
  )
    external
    payable
  {
    userManager.setUser(dbAddress, msg.sender, firstName, lastName, email, gravatar);
    emit SetUser(msg.sender, true);
  }
}
