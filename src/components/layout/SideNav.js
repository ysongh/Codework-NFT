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
        active={activeItem === 'Create Bounty'}
        onClick={() => setActiveItem('Create Bounty')}>
          <Icon name='bug' />
          Create Bounty
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/codenftlist"
        active={activeItem === 'Code NFT List'}
        onClick={() => setActiveItem('Code NFT List')}>
          <Icon name='grid layout' />
          Code NFT List
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/addcode"
        active={activeItem === 'Add Code'}
        onClick={() => setActiveItem('Add Code')}>
          <Icon name='code' />
          Add Code
      </Menu.Item>

      <Menu.Item
        as="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSekANSgKrBphtgclHiLZFLugK8qqeXFPojraqksycwbeJPEWQ/viewform"
        target="_blank"
        rel="noopener noreferrer">
          <Icon name='sticky note' />
          Feedback
      </Menu.Item>
      
      {walletAddress ? (
        <Menu.Menu position='right'>
          <Menu.Item>
            <p>{walletAddress.substring(0,6)}...{walletAddress.substring(36,42)}</p>
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
