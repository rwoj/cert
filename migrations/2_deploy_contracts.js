var CertyficateCreator = artifacts.require("./CertyficateCreator.sol");

module.exports = function(deployer) {
  deployer.deploy(CertyficateCreator);
};
