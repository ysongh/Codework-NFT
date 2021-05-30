import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';

function Navbar({ loadBlockchain, walletAddress }) {
  return (
    <Menu color="violet" inverted pointing>
      <Container>
        <img src='/logo.png' style={{ width: '10rem'}} />
        <Menu.Item
          as={Link}
          to="/"
          name='Home'
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
              <Button color="red">Disconnect</Button>
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
