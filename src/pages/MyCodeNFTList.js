import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Button } from 'semantic-ui-react';

import ConnectWalletMessage from '../components/common/ConnectWalletMessage';

function MyCodeNFTList({ walletAddress, codeworkNFTBlockchain }) {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const loadmyNFTs = async () => {
      const myNFTs = await codeworkNFTBlockchain.methods.getAllNFTsOwnByUser(walletAddress).call();
      setCodes(myNFTs);
    }

    if (codeworkNFTBlockchain) loadmyNFTs();
  }, [codeworkNFTBlockchain])

  console.log(codes)

  return (
    <Container>
      <h1>My Code NFT List</h1>
      {!codeworkNFTBlockchain
        ? <ConnectWalletMessage />
        : <Grid columns={3} doubling>
            <Grid.Row>
              {codes.map(code => (
                <Grid.Column key={code.codeId} style={{marginBottom: '1rem'}}>
                  <Card color='orange'>
                    <Card.Content>
                      <Card.Header>{code.title}</Card.Header>
                      <Card.Meta>
                        {code.price / 10 ** 18} ETH
                      </Card.Meta>
                      <Card.Description>
                        {code.description}
                      </Card.Description>
                      <div style={{marginTop: '.7rem'}}>
                        <Button color='violet' fluid  as={Link} to={`/codenftlist/${code.codeId}`}>
                          View
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
      }
    </Container>
  )
}

export default MyCodeNFTList;