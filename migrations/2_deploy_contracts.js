const CodeworkNFT = artifacts.require("CodeworkNFT");

module.exports = function(deployer){
  deployer.deploy(CodeworkNFT);
}