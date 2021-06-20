import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Message, Card, Button } from 'semantic-ui-react';

import CardLoading from '../components/CardLoading';

function CodeWorks({ codeworkNFTBlockchain }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWorks = async () => {
      try{
        setLoading(true);
        const worksCount = await codeworkNFTBlockchain.methods.worksCount().call();
        const temp = [];
        for (let i = 1; i <= worksCount; i++) {
          const work = await codeworkNFTBlockchain.methods.workList(i).call();
          work.metadataURL = work.metadataURL.split("://");
          let data = await fetch('https://ipfs.io/ipfs/' + work.metadataURL[1]);
          data = await data.json();
          data.id = work.metadataURL[1];
          data.cid = work.metadataURL[1].slice(0, 59);
          console.log(data);
          temp.push(data);
        }
        setWorks(temp);
        setLoading(false);
      }
      catch(error){
        console.log(error);
        setLoading(false);
      }
      
    }

    if (codeworkNFTBlockchain) loadWorks();
  }, [codeworkNFTBlockchain])

  return (
    <Container>
      <Message>
        <Message.Header>Contract are not deployed yet</Message.Header>
      </Message>
      
      <h1>List of Bounties</h1>
      {loading
        ? <CardLoading />
        : <Grid columns={3}>
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
                        <Button color='violet' as={Link} to={`/works/${work.cid}/${index + 1}`}>
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

export default CodeWorks;
