const StarNotary = artifacts.require("StarNotary");
module.exports = function(deployer, network, accounts){
    console.log("The network selected to deploy is: " + network);
    if (network == "rinkeby") {
        deployer.deploy(StarNotary,{from: accounts[0]})
    } else if (network == "development") {
        deployer.deploy(StarNotary,{from: accounts[0]})
    }
}

