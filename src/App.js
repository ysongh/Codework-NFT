import React, { useState } from 'react';
import Web3 from 'web3';

import './App.css';
import CodeworkNFT from './abis/CodeworkNFT.json';
import AddForm from './pages/AddForm';

function App() {
  const [account, setAccount] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [codeworkNFTBlockchain, setCodeworkNFTBlockchain] = useState(null);

  const loadBlockchain = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const web3 = window.web3;

    const netId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);

    if(netId){
      const codeworkNFT = new web3.eth.Contract(CodeworkNFT.abi, CodeworkNFT.networks[netId].address);
      setCodeworkNFTBlockchain(codeworkNFT);

      const totalSupply = await codeworkNFT.methods.totalSupply().call();
      setTotalSupply(totalSupply);
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  return (
    <div className="App">
      <h1>Codework NFT</h1>
      <p>{account}</p>
      <p>{totalSupply}</p>
      <button onClick={loadBlockchain}>Open Wallet</button>
      <AddForm
        walletAddress={account}
        codeworkNFTBlockchain={codeworkNFTBlockchain} />
    </div>
  );
}

export default App;
