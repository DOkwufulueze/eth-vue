pragma solidity 0.4.18;

import "./utilities.sol";

library userManager {
  using strings for *;

  function setStatus (address dbAddress, address userId, uint8 status) internal {
    DB(dbAddress).setUInt8Value(keccak256("user/status", userId), status);
  }

  function getUsersCount (address dbAddress) internal view returns (uint) {
    return DB(dbAddress).getUIntValue(keccak256("users/count"));
  }

  function isUserExists (address dbAddress, address userId) internal view returns (bool) {
    return getStatus(dbAddress, userId) > 0;
  }

  function getStatus (address dbAddress, address userId) internal view returns (uint8) {
    return DB(dbAddress).getUInt8Value(keccak256("user/status", userId));
  }

  function setUser (
    address dbAddress,
    address userId,
    string firstName,
    string lastName,
    string email,
    bytes32 gravatar
  )
    internal
  {
    var firstNameLength = firstName.toSlice().len();
    var lastNameLength = lastName.toSlice().len();
    var emailLength = email.toSlice().len();
    uint maxUserNameLength = utilities.getConfig(dbAddress, "config/max-user-name-length");
    uint minUserNameLength = utilities.getConfig(dbAddress, "config/min-user-name-length");
    uint maxEmailLength = utilities.getConfig(dbAddress, "config/max-user-email-length");
    uint minEmailLength = utilities.getConfig(dbAddress, "config/min-user-email-length");

    require(firstNameLength <= maxUserNameLength && firstNameLength >= minUserNameLength);
    require(lastNameLength <= maxUserNameLength && lastNameLength >= minUserNameLength);
    require(emailLength <= maxEmailLength && emailLength >= minEmailLength);

    checkUserAndInitIfNecessary(dbAddress, userId);
    DB(dbAddress).setStringValue(keccak256("user/first-name", userId), firstName);
    DB(dbAddress).setStringValue(keccak256("user/last-name", userId), lastName);
    DB(dbAddress).setStringValue(keccak256("user/email", userId), email);
    DB(dbAddress).setBytes32Value(keccak256("user/gravatar", userId), gravatar);
  }

  function checkUserAndInitIfNecessary (
    address dbAddress,
    address userId
  )
    internal
  {
    if (!isUserExists(dbAddress, userId)) {
      DB(dbAddress).setUIntValue(keccak256("user/created-on", userId), now);
      DB(dbAddress).setUInt8Value(keccak256("user/status", userId), 1);
      utilities.addArrayItem(dbAddress, "users/ids", "users/count", userId);
    }
  }

  function login (address dbAddress, address userId) internal view returns (bool isValidUser) {
    if (isUserExists(dbAddress, userId)) {
      return true;
    } else {
      return false;
    }
  }

}
