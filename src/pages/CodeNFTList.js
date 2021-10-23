import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, Button } from 'semantic-ui-react';

function CodeNFTList({ codeworkNFTBlockchain }) {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const loadWorks = async () => {
      const count = await codeworkNFTBlockchain.methods.codeDataCount().call();
      const temp = [];

      for (let i = 1; i <= count; i++) {
        let data = await codeworkNFTBlockchain.methods.codeDataList(i).call();
        temp.push(data);
      }
      setCodes(temp);
    }

    if (codeworkNFTBlockchain) loadWorks();
  }, [codeworkNFTBlockchain])

  console.log(codes)

  return (
    <Container className="bodyHeight">
      <h1>List of Codes</h1>
      {!codeworkNFTBlockchain
        ? <h4 style={{ color: 'red' }}>Connect to your ethereum wallet</h4>
        : <Grid columns={3} doubling>
            <Grid.Row>
              {codes.map(code => (
                <Grid.Column key={code.codeId} style={{marginBottom: '1rem'}}>
                  <Card color='orange'>
                    <Card.Content>
                      <Card.Header>{code.title}</Card.Header>
                      <Card.Description>
                        {code.description}
                      </Card.Description>
                      <div style={{marginTop: '.7rem'}}>
                        <Button color='violet'>
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

export default CodeNFTList;