import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Button } from 'semantic-ui-react';

function CodeWorks({ codeworkNFTBlockchain }) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const loadWorks = async () => {
      const totalSupply = await codeworkNFTBlockchain.methods.totalSupply().call();
      const temp = [];
      for (let i = 1; i <= totalSupply; i++) {
        let metadataURL = await codeworkNFTBlockchain.methods.tokenURI(i).call();
        metadataURL = metadataURL.split("://");
        let data = await fetch('https://ipfs.io/ipfs/' + metadataURL[1]);
        data = await data.json();
        data.id = metadataURL[1];
        data.cid = metadataURL[1].slice(0, 59);
        console.log(data);
        temp.push(data);
      }
      setWorks(temp);
    }

    if (codeworkNFTBlockchain) loadWorks();
  }, [codeworkNFTBlockchain])

  return (
    <Container>
      <Grid columns={4}>
        <Grid.Row>
          {works.map((work, index) => (
            <Grid.Column key={work.id} style={{marginBottom: '1rem'}}>
              <Card color='orange'>
                <Card.Content>
                  <Card.Header>{work.name}</Card.Header>
                  <Card.Description>
                    {work.description}
                  </Card.Description>
                  <div style={{marginTop: '.7rem'}}>
                    <Button basic color='green' as={Link} to={`/works/${work.cid}/${index}`}>
                      View
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default CodeWorks;
