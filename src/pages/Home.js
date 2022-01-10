import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Image, Button } from 'semantic-ui-react';

function Home() {
  const history = useNavigate();

  return (
    <Container>
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
