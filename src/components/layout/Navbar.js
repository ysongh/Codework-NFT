import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';

function Navbar({ loadBlockchain, walletAddress, setAccount, setCodeworkNFTBlockchain }) {
  const [activeItem, setActiveItem] = useState('Home');
  
  const logout = () => {
    setAccount('');
    setCodeworkNFTBlockchain(null);
  }
  return (
    <Menu color="violet" inverted pointing stackable>
      <Container>
        <Menu.Item
          as={Link}
          to="/"
          onClick={() => setActiveItem('Home')}
        >
          <img src='/logo.png' style={{ width: '10rem'}} alt="Logo" />
        </Menu.Item>
        
        <Menu.Item
          as={Link}
          to="/"
          name='Home'
          active={activeItem === 'Home'}
          onClick={() => setActiveItem('Home')}
        />
        <Menu.Item
          as={Link}
          to="/addform"
          name='Add Work'
          active={activeItem === 'Add Work'}
          onClick={() => setActiveItem('Add Work')}
        />
        <Menu.Item
          as={Link}
          to="/codenftlist"
          name='Code NFT List'
          active={activeItem === 'Code NFT List'}
          onClick={() => setActiveItem('Code NFT List')}
        />
        {walletAddress ? (
          <Menu.Menu position='right'>
            <Menu.Item>
              <p>{walletAddress.substring(0,8)}...{walletAddress.substring(34,42)}</p>
            </Menu.Item>
            <Menu.Item>
              <Button color="red" onClick={logout}>Disconnect</Button>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color='teal' onClick={loadBlockchain}>Open Wallet</Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  )
}

export default Navbar;
