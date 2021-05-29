import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';

function Navbar({ loadBlockchain, walletAddress }) {
  return (
    <Menu color="blue" inverted pointing>
      <Container>
        <Menu.Item
          as={Link}
          to="/"
          name='Codework NFT'
        />
        <Menu.Item
          as={Link}
          to="/addform"
          name='Add Work'
        />
        {walletAddress ? (
          <Menu.Menu position='right'>
            <Menu.Item>
              <p>{walletAddress.substring(0,8)}...{walletAddress.substring(34,42)}</p>
            </Menu.Item>
            <Menu.Item>
              <Button secondary>Disconnect</Button>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color='green' onClick={loadBlockchain}>Open Wallet</Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  )
}

export default Navbar;
