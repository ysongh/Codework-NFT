import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Image, Message, Button } from 'semantic-ui-react';

function Home() {
  const history = useNavigate();

  const [showMessage, setShowMessage] = useState(true);

  const handleDismiss = () => {
    setShowMessage(false);
  }

  return (
    <Container>
      {showMessage && <Message
        color='teal'
        onDismiss={handleDismiss}
        header='Contract is deployed on Kovan Test Network'
      />}
      <Grid style={{ marginTop: '3rem'}} stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Image src='./heroimg.svg' alt="Code" style={{ width: "80%"}}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <h1 style={{ fontSize: '2.8rem', marginTop: '3rem'}}>Turn your code into NFT</h1>
            <br />
            <Button color='violet' onClick={() => history('/listofbounties')} size='large'>
              Bounties
            </Button>
            <Button color='teal' onClick={() => history('/codenftlist')} size='large'>
              Code NFTs
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Home;
