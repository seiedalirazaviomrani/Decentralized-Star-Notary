# Decentralized Star Notary

For this project, we will create a DApp by adding functionality to our smart contract and deploy it on the public testnet. To do so, we'll employ our blockchain identity to secure digital assets on the Ethereum platform using a smart contract. We will get to practice our knowledge of the basics of Solidity.

### Prerequisites

Node and NPM. You can install these softwares by using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Install ganache (graphical interface) and ganache-cli
* Donwload the ganache with GUI installer from [https://truffleframework.com/ganache]
* ganache-cli
 ```
 npm install -g ganache-cli
 ```
- Install truffle
```
npm install -g truffle
```
- Install http-server
```
npm install -g http-server
```
- Go to the project folder
```
cd <project name>/smart_contracts
```
- Install the openzeppelin-solidity
```
npm install --save-exact openzeppelin-solidity@2.0.0-rc.1
```
- Install the truffle-hdwallet-provider
```
npm install --save-exact truffle-hdwallet-provider@0.0.6
```
- Install the metamask plugin in your chrome browser [https://metamask.io/]

## Test smart contract code coverage

- Go to the command prompt and start ganache-cli
```
ganache-cli
```
- In another command prompt we will open the smart_contracts folder
```
cd <project name>/smart_contracts/test
```
- Let`s execute the test with the following command. You can see my truffle test result in the below screenshot
```
truffle test StarNotaryTest.js
```
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img1.png?raw=true">


## Deploy smart contract on a public test network

To deploy the smart contract locally in our ganache local network or in some public network we have to create a truffle-config.js
- Use the template in the truffle-example.js file to crete your truffle-config.js configuration file

### Deploy in local ganache network
- Go to the command prompt and start ganache-cli
```
ganache-cli
```
- In another command prompt we will open the smart_contracts folder
```
cd <project name>/smart_contracts
```
- To deploy 
```
truffle deploy --network development
```
- You can see my truffle deploy in the development network in the below screenshot
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img2.png?raw=true">

### Deploy in ethereum public network like Rinkeby
- Open in a command prompt the smart_contracts folder
```
cd <project name>/smart_contracts
```
- To deploy
```
truffle deploy --network rinkeby
```
- You can see my truffle deploy in the rinkeby network in the below screenshot
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img3.png?raw=true">

### My StarNotary contract deployed in Rinkeby test network

To check my result please see the below screen shot files and check the transaction hash in https://etherscan.io website.

<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img4.png?raw=true">

<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img5.png?raw=true">

## Contract
- Transaction Hash
```
0x354b0aa36d8acff0fbcb48a5ad6d6bd4b951ec3a200c0b8cc8556ca351e44e10
```
- Contract Address
```
0xf2040E4250116AA939513ff213056477b46305A8
```

## Create Star
- Transaction hash
```
0xb807e852e24b7fb5c50bd9cf7796edc0e604f5f9ab3524f9e95a645aec734eb0
```

## Put the star to buy
- Transaction hash
```
0x9e6428ad36396522d53287b079c59b6abc748f91453424692af8afde45f8d6db
```

## Modify client code to interact with smart contract

In this section you could interact with the previous deployed StarNotary smart contract in public Rinkeby test network using a web application.

- Open in a command prompt the smart_contracts folder
```
cd <project name>
```
- To star the web service
```
http-server
```
- Open in your chrome browser (with metamask plugin already logged-in) the following url
```
http://127.0.0.1:8080
```
- Under Create Star service you can create a star using the Ra-Dec-Mag coordinators
- Under Search Star service you can search for a specific star using the Ra-Dec-Mag coordinators
