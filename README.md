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

## Contract
- Transaction Hash
```
0x61b3e846f59afab563e2653f33aeeb09e7532eac4317a9e6de45d1104f1e035d
```
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img4.png?raw=true">


- Contract Address
```
0x5B90ef577749C639f97cFA78267f15Bef81e97dB
```
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img5.png?raw=true">


## Create Star
- Transaction hash
```
0x74a42c6de6c1fc6a669ac5777f107ee08f38552431d37b5a882773a196b47c4c
```
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img6.png?raw=true">


## Put the star to buy
- Transaction hash
```
0xf0c45904cdc09ebd7b5cd052d80c64085570bc4532995a75cdfccfdfb5eb8492
```
<img src="https://github.com/seiedalirazaviomrani/Decentralized-Star-Notary/blob/master/img/img7.png?raw=true">


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
