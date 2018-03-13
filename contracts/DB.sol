pragma solidity 0.4.18;

import './zeppelin/lifecycle/Destructible.sol';
import "./zeppelin/math/SafeMath.sol";
import "./lib/arachnid/solidity-stringutils/strings.sol";

contract DB is Destructible {
  using strings for *;

  address[] public permittedContractsAddresses;
  mapping(address => bool) public permissionStatusForContract;

  // DB implemented as bytes32 mappings
  mapping(bytes32 => address) AddressDataStore;
  mapping(bytes32 => bool) BoolDataStore;
  mapping(bytes32 => bytes) BytesDataStore;
  mapping(bytes32 => bytes32) Bytes32DataStore;
  mapping(bytes32 => int) IntDataStore;
  mapping(bytes32 => uint) UIntDataStore;
  mapping(bytes32 => uint8) UInt8DataStore;
  mapping(bytes32 => string) StringDataStore;

  modifier onlyPermittedContractOrOwner {
    require(permissionStatusForContract[msg.sender] || msg.sender == owner);
    _;
  }

  function DB () public {

  }

  // AddressDataStore
  function getAddressValue (bytes32 recordFieldName) public view returns (address) {
    return AddressDataStore[recordFieldName];
  }

  function setAddressValue (bytes32 recordFieldName, address value) external
    onlyPermittedContractOrOwner
  {
    AddressDataStore[recordFieldName] = value;
  }

  function deleteAddressValue (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete AddressDataStore[recordFieldName];
  }

  // BoolDataStore
  function getBoolValue (bytes32 recordFieldName) public view returns (bool) {
    return BoolDataStore[recordFieldName];
  }

  function setBoolValue (bytes32 recordFieldName, bool value) external
    onlyPermittedContractOrOwner
  {
    BoolDataStore[recordFieldName] = value;
  }

  function deleteBoolValue (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete BoolDataStore[recordFieldName];
  }

  // BytesDataStore
  function getBytesValue (bytes32 recordFieldName) public view returns (bytes) {
    return BytesDataStore[recordFieldName];
  }

  function setBytesValue (bytes32 recordFieldName, bytes value) external
    onlyPermittedContractOrOwner
  {
    BytesDataStore[recordFieldName] = value;
  }

  function deleteBytesValue (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete BytesDataStore[recordFieldName];
  }

  // Bytes32DataStore
  function getBytes32Value (bytes32 recordFieldName) public view returns (bytes32) {
    return Bytes32DataStore[recordFieldName];
  }

  function setBytes32Value (bytes32 recordFieldName, bytes32 value) external
    onlyPermittedContractOrOwner
  {
    Bytes32DataStore[recordFieldName] = value;
  }

  function deleteBytes32Value (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete Bytes32DataStore[recordFieldName];
  }

  // IntDataStore
  function getIntValue (bytes32 recordFieldName) public view returns (int) {
    return IntDataStore[recordFieldName];
  }

  function setIntValue (bytes32 recordFieldName, int value) external
    onlyPermittedContractOrOwner
  {
    IntDataStore[recordFieldName] = value;
  }

  function deleteIntValue (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete IntDataStore[recordFieldName];
  }

  // UIntDataStore
  function getUIntValue (bytes32 recordFieldName) public view returns (uint) {
    return UIntDataStore[recordFieldName];
  }

  function setUIntValue (bytes32 recordFieldName, uint value) public
    onlyPermittedContractOrOwner
  {
    UIntDataStore[recordFieldName] = value;
  }

  function addUIntValue (bytes32 recordFieldName, uint value) external
    onlyPermittedContractOrOwner
  {
    UIntDataStore[recordFieldName] = SafeMath.add(UIntDataStore[recordFieldName], value);
  }

  function subUIntValue (bytes32 recordFieldName, uint value) external
    onlyPermittedContractOrOwner
  {
    UIntDataStore[recordFieldName] = SafeMath.sub(UIntDataStore[recordFieldName], value);
  }

  function deleteUIntValue (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete UIntDataStore[recordFieldName];
  }

  // UInt8DataStore
  function getUInt8Value (bytes32 recordFieldName) public view returns (uint8){
    return UInt8DataStore[recordFieldName];
  }

  function setUInt8Value (bytes32 recordFieldName, uint8 value) public
    onlyPermittedContractOrOwner
  {
    UInt8DataStore[recordFieldName] = value;
  }

  function deleteUInt8Value (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete UInt8DataStore[recordFieldName];
  }

  // StringDataStore
  function getStringValue (bytes32 recordFieldName) public view returns (string) {
    return StringDataStore[recordFieldName];
  }

  function setStringValue (bytes32 recordFieldName, string value) external
    onlyPermittedContractOrOwner
  {
    StringDataStore[recordFieldName] = "^".toSlice().concat(value.toSlice());
  }

  function deleteStringValue (bytes32 recordFieldName) external
    onlyPermittedContractOrOwner
  {
    delete StringDataStore[recordFieldName];
  }

  // DB Utilities

  function addPermittedContract (address contractAddress) external
  onlyOwner {
    permissionStatusForContract[contractAddress] = true;
    permittedContractsAddresses.push(contractAddress);
  }

  function addPermittedContracts (address[] addresses) external
  onlyOwner {
    for (uint i = 0; i < addresses.length; i++) {
      permissionStatusForContract[addresses[i]] = true;
      permittedContractsAddresses.push(addresses[i]);
    }
  }

  function removePermittedContract (address addresses) external
  onlyOwner {
    permissionStatusForContract[addresses] = false;
  }

  function removePermittedContracts (address[] addresses) external
  onlyOwner {
    for (uint i = 0; i < addresses.length; i++) {
      permissionStatusForContract[addresses[i]] = false;
    }
  }

  function permittedContractsCount () public view returns (uint count) {
    for (uint i = 0; i < permittedContractsAddresses.length; i++) {
      if (permissionStatusForContract[permittedContractsAddresses[i]]) {
        count++;
      }
    }

    return count;
  }

  function getPermittedContracts () external constant returns (address[] addresses) {
    addresses = new address[](permittedContractsCount());
    for (uint i = 0; i < permittedContractsAddresses.length; i++) {
      if (permissionStatusForContract[permittedContractsAddresses[i]]) {
        addresses[i] = permittedContractsAddresses[i];
      }
    }

    return addresses;
  }

  // Fetch Data
  function getObjectData (bytes32[] recordFieldNames, uint8[] recordFieldTypes)
    external view returns
  (
    uint[] items,
    string strings
  )
  {
    uint countOfIntegerTypes = getCountOfIntegerTypes(recordFieldTypes);
    /*
      objectsCount gives the number of entities we're basing the search on. Search may be needed for several entities for which recordFieldTypes[] is the same for all of them. E.g. get the name, email, gender, and state of 5 people:
      recordFieldNames: [
        keccak256("user/name", "0x9838cdba..."), keccak256("user/email", "0x9838cdba..."), keccak256("user/gender", "0x9838cdba..."), keccak256("user/state", "0x9838cdba..."),

        keccak256("user/name", "0xabc63533..."), keccak256("user/email", "0xabc63533..."), keccak256("user/gender", "0xabc63533..."), keccak256("user/state", "0xabc63533..."),

        keccak256("user/name", "0x08253befd..."), keccak256("user/email", "0x08253befd..."), keccak256("user/gender", "0x08253befd..."), keccak256("user/state", "0x08253befd..."),

        keccak256("user/name", "0x0b6354a..."), keccak256("user/email", "0x0b6354a..."), keccak256("user/gender", "0x0b6354a..."), keccak256("user/state", "0x0b6354a..."),

        keccak256("user/name", "0x07352bac36..."), keccak256("user/email", "0x07352bac36..."), keccak256("user/gender", "0x07352bac36..."), keccak256("user/state", "0x07352bac36...")

      ],
      recordFieldTypes: [7, 7, 5, 3]
      In this case, recordFieldNames.length = 20, recordFieldTypes.length = 4 => objectsCount = 5 [the search is being done for 5 entities]
    */
    uint objectsCount = recordFieldNames.length / recordFieldTypes.length;
    items = new uint[](objectsCount * countOfIntegerTypes);
    uint k;
    for (uint i = 0; i < objectsCount; i++) {
      for (uint j = 0; j < recordFieldTypes.length; j++) {
        uint r_i = (i * recordFieldTypes.length) + j;
        if (recordFieldTypes[j] == 7) {
          strings = strings.toSlice().concat(getStringValue(recordFieldNames[r_i]).toSlice());
          strings = strings.toSlice().concat("666--ETH-VUE--666".toSlice());
        } else {
          items[k] = getCorrespondingIntegerValue(recordFieldNames[r_i], recordFieldTypes[j]);
          k++;
        }
      }
      strings = strings.toSlice().concat("666--ETH-VUE-LIST--666".toSlice());
    }

    return (items, strings);
  }

  function getCountOfIntegerTypes (uint8[] recordFieldTypes) public pure returns (uint count) {
    count = 0;
    for (uint i = 0; i < recordFieldTypes.length ; i++) {
      if (recordFieldTypes[i] != 7) { // recordFieldType 7 is for strings
        count += 1;
      }
    }

    return count;
  }

  function getCorrespondingIntegerValue (bytes32 recordFieldName, uint8 uintType) public view returns (uint) {
    // recordFieldTypes: 1 => bool, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
    if (uintType == 1) {
      return boolToUInt(getBoolValue(recordFieldName));
    } else if (uintType == 2) {
      return uint(getUInt8Value(recordFieldName));
    } else if (uintType == 3) {
      return getUIntValue(recordFieldName);
    } else if (uintType == 4) {
      return uint(bytes32(getAddressValue(recordFieldName)));
    } else if (uintType == 5) {
      return uint(getBytes32Value(recordFieldName));
    } else {
      return 0;
    }
  }

  function boolToUInt (bool logicEntry) public pure returns (uint) {
    if (logicEntry) {
      return 1;
    } else {
      return 0;
    }
  }
}
