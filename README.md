# Codework NFT
A dapp where users can request a website for developers to created it and they can buy it from the developers code

## Features
- Users can make a post on what kind of website or features they want.
- Users's post data and image are stored in nft.storage
- Developers can see a list of bounties and choose which bounties to work on.
- Developers can upload their codes which is stored on Fleek storage.

## Technologies
- React
- semantic-ui
- nft.storage
- fleek-storage

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const NFTStorageAPIKey = "Create API key from nft.storage";
export const fleekAPIKey = "Create API key from fleek-storage";
export const fleekAPISecret = "Create API key from fleek-storage";
```
- Create a file called '.env' on the root folder and add the following code
```
MNEMONIC=< Your mnemonic >
INFURA_ENDPOINT=< Your infura endpoint>
```
- Run `npm start` to start the dapp

## Disclaimer
These contracts are not audited.  Please review this code on your own before using any of the following code for production.  I will not be responsible or liable for all loss or damage caused from this project.