pragma solidity 0.4.18;

import './zeppelin/lifecycle/Destructible.sol';

contract Authentication is Destructible {
  struct User {
    bytes32 firstName;
    bytes32 lastName;
    bytes32 email;
  }

  event SignedUp(address indexed _userAddress, bytes32 _firstName, bytes32 _lastName, bytes32 indexed _email);
  event Updated(address indexed _userAddress, bytes32 _firstName, bytes32 _lastName, bytes32 indexed _email);
  mapping (address => User) private users;
  address[] usersArray;

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[msg.sender].firstName == 0x0) && !(users[msg.sender].lastName == 0x0) && !(users[msg.sender].email == 0x0));
    _;
  }

  modifier onlyValidEmail(bytes32 email) {
    // Only valid emails allowed

    require(!(email == 0x0));
    _;
  }

  modifier onlyValidFirstName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  modifier onlyValidLastName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login()
    external
    view
    onlyExistingUser
    returns (bytes32, bytes32, bytes32)
  {
    return (users[msg.sender].firstName, users[msg.sender].lastName, users[msg.sender].email);
  }

  function signup(bytes32 firstName, bytes32 lastName, bytes32 email)
    external
    payable
    onlyValidFirstName(firstName)
    onlyValidLastName(lastName)
    onlyValidEmail(email)
    returns (bytes32, bytes32, bytes32)
  {
    // Check if user exists.
    // If yes, return user.
    // If no, check if user details were sent.
    // If yes, create and return user.

    if (users[msg.sender].firstName == 0x0) users[msg.sender].firstName = firstName;
    if (users[msg.sender].lastName == 0x0) users[msg.sender].lastName = lastName;
    if (users[msg.sender].email == 0x0) users[msg.sender].email = email;

    SignedUp(msg.sender, firstName, lastName, email);
  }

  function update(bytes32 firstName, bytes32 lastName, bytes32 email)
    external
    payable
    onlyValidFirstName(firstName)
    onlyValidLastName(lastName)
    onlyValidEmail(email)
    onlyExistingUser
    returns (bytes32, bytes32, bytes32)
  {
    // Update user.

    if (users[msg.sender].firstName != 0x0) users[msg.sender].firstName = firstName;
    if (users[msg.sender].lastName != 0x0) users[msg.sender].lastName = lastName;
    if (users[msg.sender].email != 0x0) users[msg.sender].email = email;

    Updated(msg.sender, firstName, lastName, email);
  }
}
