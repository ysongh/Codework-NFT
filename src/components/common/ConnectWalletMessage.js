import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

function ConnectWalletMessage() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='ethereum' />
        Connect to your ethereum wallet is required
      </Header>
    </Segment>
  )
}

export default ConnectWalletMessage;