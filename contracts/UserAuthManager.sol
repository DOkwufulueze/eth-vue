pragma solidity 0.4.18;

import './lib/userManager.sol';

contract UserAuthManager is Destructible {
  address public dbAddress;
  event SetUser(address indexed _userAddress, bool isSetUp);

  function UserAuthManager (address _dbAddress) public {
    require(_dbAddress != 0x0);
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
    string firstName,
    string lastName,
    string email,
    bytes32 gravatar
  )
    external
    payable
  {
    userManager.setUser(dbAddress, msg.sender, firstName, lastName, email, gravatar);
    SetUser(msg.sender, true);
  }
}
