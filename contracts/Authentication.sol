pragma solidity 0.4.18;

import './lib/userManager.sol';

contract Authentication is Destructible {
  address public dbAddress;
  event SetUser(address indexed _userAddress, bool isSetUp);

  function Authentication (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
    setConfig();
  }

  function setConfig ()
    private
    onlyOwner
  {
    DB(dbAddress).setUIntValue(keccak256('config/max-user-name-length'), 50);
    DB(dbAddress).setUIntValue(keccak256('config/min-user-name-length'), 5);
    DB(dbAddress).setUIntValue(keccak256('config/max-user-email-length'), 80);
    DB(dbAddress).setUIntValue(keccak256('config/min-user-email-length'), 0);
  }

  function login ()
    external
    view
    returns (bool)
  {
    return userManager.login(dbAddress, msg.sender);
  }

  function setUser (string firstName, string lastName, string email, bytes32 gravatar)
    external
    payable
  {
    userManager.setUser(dbAddress, msg.sender, firstName, lastName, email, gravatar);
    SetUser(msg.sender, true);
  }
}
