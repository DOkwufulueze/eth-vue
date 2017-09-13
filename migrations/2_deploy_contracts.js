var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Destructible = artifacts.require("./zeppelin/lifecycle/Destructible.sol");
var Authentication = artifacts.require("./Authentication.sol");
var SafeMath = artifacts.require("./zeppelin/math/SafeMath.sol");
var PullPayment = artifacts.require("./zeppelin/payment/PullPayment.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Destructible);
  deployer.deploy(Destructible);
  deployer.link(Destructible, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, PullPayment);
  deployer.deploy(PullPayment);
};
