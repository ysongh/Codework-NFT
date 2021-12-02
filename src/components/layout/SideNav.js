import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Button } from 'semantic-ui-react';

function SideNav({ loadBlockchain, walletAddress, setAccount, setCodeworkNFTBlockchain, activeItem, setActiveItem }) {
  const logout = () => {
    setAccount('');
    setCodeworkNFTBlockchain(null);
  }

  return (
    <>
      <Menu.Item as={Link} to="/">
        <Icon name='home' />
        Home
      </Menu.Item>
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
    </>
  )
}

export default SideNav;
