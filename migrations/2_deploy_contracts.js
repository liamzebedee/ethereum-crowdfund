var CrowdfundProject = artifacts.require("./CrowdfundProject.sol");

module.exports = function(deployer) {
  let goalInEthers = 675;
  let durationInDays = 7;
  deployer.deploy(CrowdfundProject, goalInEthers, durationInDays);
};
