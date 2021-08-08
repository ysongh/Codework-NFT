import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

function Footer() {
  return (
    <Segment inverted color='violet' style={{ textAlign: 'center', padding: '1rem 0'}}>
      <a href='mailto:codeworknft@gmail.com' aria-label='Icon' target='_blank' rel='noopener noreferrer'>
        <Icon link size='big' name='mail' color='teal' style={{ marginBottom: '.5rem', marginRight: '1rem' }} />
      </a>
      <a href='https://twitter.com/codeworknft' aria-label="Icon" target='_blank' rel='noopener noreferrer'>
        <Icon link size='big' name='twitter' color='teal' style={{ marginBottom: '.5rem' }} />
      </a>
      <p style={{ fontSize: '1.3rem' }}>Copyright &copy; 2021 Codework NFT</p>
    </Segment>
  )
}

export default Footer; 