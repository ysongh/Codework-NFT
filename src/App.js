import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Web3 from 'web3';

import './App.css';
import CodeworkNFT from './abis/CodeworkNFT.json';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AddForm from './pages/AddForm';
import CodeWorks from './pages/CodeWorks';
import CodeWorkDetail from './pages/CodeWorkDetail';

function App() {
  const [account, setAccount] = useState('');
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
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  return (
    <Router className="App">
      <Navbar
        loadBlockchain={loadBlockchain}
        walletAddress={account}
        setAccount={setAccount} />
      <Switch>
        <Route path="/addform">
          <AddForm />
        </Route>
        <Route path="/works/:cid">
          <CodeWorkDetail
            walletAddress={account}
            codeworkNFTBlockchain={codeworkNFTBlockchain} />
        </Route>
        <Route path="/">
          <CodeWorks />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
