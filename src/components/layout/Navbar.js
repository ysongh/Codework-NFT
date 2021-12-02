import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button, Icon } from 'semantic-ui-react';

function Navbar({ loadBlockchain, walletAddress, setAccount, setCodeworkNFTBlockchain, setVisible, activeItem, setActiveItem }) {
  const logout = () => {
    setAccount('');
    setCodeworkNFTBlockchain(null);
  }

  return (
    <Menu color="violet" inverted pointing>
      <Container>
        <Menu.Item
          as={Link}
          to="/"
          onClick={() => setActiveItem('Home')}
        >
          <img src='/logo.png' style={{ width: '10rem'}} alt="Logo" />
        </Menu.Item>
        
        <div className="navbar">
          <Menu.Item
            as={Link}
            to="/"
            name='Home'
            active={activeItem === 'Home'}
            onClick={() => setActiveItem('Home')}
          />
          <Menu.Item
            as={Link}
            to="/addbounty"
            name='Create Bounty'
            active={activeItem === 'Create Bounty'}
            onClick={() => setActiveItem('Create Bounty')}
          />
          <Menu.Item
            as={Link}
            to="/codenftlist"
            name='Code NFT List'
            active={activeItem === 'Code NFT List'}
            onClick={() => setActiveItem('Code NFT List')}
          />
          <Menu.Item
            as={Link}
            to="/addcode"
            name='Add Code'
            active={activeItem === 'Add Code'}
            onClick={() => setActiveItem('Add Code')}
          />
          <Menu.Item
            as="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSekANSgKrBphtgclHiLZFLugK8qqeXFPojraqksycwbeJPEWQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            name='Feedback'
          />
          
        </div>
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
        <Button className="navbar_btn" icon basic color='teal' onClick={() => setVisible(true)}>
          <Icon className="navbar_icon" name='bars' />
        </Button>
      </Container>
    </Menu>
  )
}

export default Navbar;
