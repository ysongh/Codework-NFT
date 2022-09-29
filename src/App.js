import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import Web3 from 'web3';

import './App.css';
import CodeworkNFT from './abis/CodeworkNFT.json';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/SideNav';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AddBounty from './pages/AddBounty';
import Bounties from './pages/Bounties';
import BountyDetail from './pages/BountyDetail';
import CodeNFTList from './pages/CodeNFTList';
import CodeDetail from './pages/CodeDetail';
import AddCode from './pages/AddCode';

function App() {
  const [account, setAccount] = useState('');
  const [myBalance, setMyBalance] = useState(0);
  const [codeworkNFTBlockchain, setCodeworkNFTBlockchain] = useState(null);
  const [activeItem, setActiveItem] = useState('Home');
  const [visible, setVisible] = useState(false);

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
    const netData = CodeworkNFT.networks[netId];

    if(netData){
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const codeworkNFT = new web3.eth.Contract(CodeworkNFT.abi, CodeworkNFT.networks[netId].address);
      setCodeworkNFTBlockchain(codeworkNFT);
    }
    else{
      window.alert('Contract is not deployed to detected network, Please try Kovan Test Network')
    }
  }

  const setActiveLink = currentPage => {
    setActiveItem(currentPage);
    setVisible(false);
  }

  return (
    <HashRouter className="App">
      <Navbar
        loadBlockchain={loadBlockchain}
        walletAddress={account}
        myBalance={myBalance}
        setAccount={setAccount}
        setCodeworkNFTBlockchain={setCodeworkNFTBlockchain}
        setVisible={setVisible}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setMyBalance={setMyBalance}/>

      <main>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            className="sidebar"
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
          >
           <SideNav
            activeItem={activeItem}
            setActiveLink={setActiveLink}/>
          </Sidebar>

          <Sidebar.Pusher >
            <Segment basic className="bodyHeight">
              <Routes>
                <Route path="/listofbounties" element={<Bounties />} />
                <Route path="/addbounty" element={<AddBounty />} />
                <Route
                  path="/addcode"
                  element={
                    <AddCode
                      walletAddress={account}
                      codeworkNFTBlockchain={codeworkNFTBlockchain} />} />
                <Route
                  path="/works/:cid"
                  element={
                    <BountyDetail
                      walletAddress={account}
                      codeworkNFTBlockchain={codeworkNFTBlockchain} /> }/>
                <Route
                  path="/codenftlist/:id"
                  element={
                    <CodeDetail
                      walletAddress={account}
                      codeworkNFTBlockchain={codeworkNFTBlockchain} /> } />
                <Route
                  path="/codenftlist"
                  element={
                    <CodeNFTList codeworkNFTBlockchain={codeworkNFTBlockchain} /> } />
                <Route path="/" element={<Home />} />
              </Routes>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </main>

      <Footer />
    </HashRouter>
  );
}

export default App;
