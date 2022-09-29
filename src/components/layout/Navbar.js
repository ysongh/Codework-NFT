import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Dropdown, Button, Icon } from 'semantic-ui-react';

function Navbar({ loadBlockchain, walletAddress, setAccount, myBalance, setCodeworkNFTBlockchain, setMyBalance, setVisible, activeItem, setActiveItem }) {
  useEffect(() => {
    if(walletAddress) getBalance();
  }, [walletAddress])
  
  const getBalance = async () => {
    const web3 = window.web3;
    const balance = await web3.eth.getBalance(walletAddress);
    setMyBalance(balance / 10 ** 18);
  }

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

          <Dropdown item text='Bounty'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/listofbounties" active={activeItem === 'List of Bounties'} onClick={() => setActiveItem('List of Bounties')}>
                List of Bounties
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/addbounty" active={activeItem === 'Create Bounty'} onClick={() => setActiveItem('Create Bounty')}>
                Create Bounty
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>


          <Dropdown item text='Code NFT' >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/codenftlist" active={activeItem === 'List of Codes'} onClick={() => setActiveItem('List of Codes')}>
                List of Codes
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/addcode" active={activeItem === 'Add Code'} onClick={() => setActiveItem('Add Code')}>
                Add Code
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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
              <p>{myBalance.toFixed(3)} ETH</p>
            </Menu.Item>
            <Menu.Item>
              <p>{walletAddress.substring(0,8)}...{walletAddress.substring(34,42)}</p>
            </Menu.Item>
            <Menu.Item>
              <Button color="red" icon onClick={logout}>
                <Icon name='sign-out' />
              </Button>
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
