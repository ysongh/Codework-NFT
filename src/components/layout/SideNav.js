import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

function SideNav({ activeItem, setActiveLink }) {
  return (
    <>
      <Menu.Item
        as={Link}
        to="/"
        active={activeItem === 'Home'}
        onClick={() => setActiveLink('Home')}>
          <Icon name='home' />
          Home
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/addbounty"
        active={activeItem === 'Create Bounty'}
        onClick={() => setActiveLink('Create Bounty')}>
          <Icon name='bug' />
          Create Bounty
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/codenftlist"
        active={activeItem === 'Code NFT List'}
        onClick={() => setActiveLink('Code NFT List')}>
          <Icon name='grid layout' />
          Code NFT List
      </Menu.Item>

      <Menu.Item
        as={Link}
        to="/addcode"
        active={activeItem === 'Add Code'}
        onClick={() => setActiveLink('Add Code')}>
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
    </>
  )
}

export default SideNav;
