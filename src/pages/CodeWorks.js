import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Message, Card, Button } from 'semantic-ui-react';
import dateFormat from 'dateformat';

import { NFTStorageAPIKey } from '../config';
import CardWorkLoading from '../components/common/CardWorkLoading';

function CodeWorks() {
  const [works, setWorks] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWorks = async () => {
      try{
        setLoading(true);
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            'Authorization': `Bearer ${NFTStorageAPIKey}`,
            'Content-Type': 'application/json'
          }
        });
        cids = await cids.json();
        console.log(cids.value);

        const temp = [];
        for (let cid of cids.value) {
          let data = await fetch(`https://ipfs.io/ipfs/${cid.cid}/metadata.json`);
          data = await data.json();
          data.cid = cid.cid;
          data.created = cid.created;
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

    loadWorks();
  }, [])

  const handleDismiss = () => {
    setShowMessage(false);
  }

  return (
    <Container className="bodyHeight">
      {showMessage && <Message
        color='teal'
        onDismiss={handleDismiss}
        header='Contract is deployed on Kovan Test Network'
      />}
      
      <h1>List of Bounties</h1>
      {loading
        ? <CardWorkLoading />
        : <Grid columns={2} doubling>
            <Grid.Row>
              {works.length
                ? works.map((work, index) => (
                    <Grid.Column key={index} style={{marginBottom: '1rem'}}>
                      <Card color='orange' fluid>
                        <Card.Content>
                          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                              <Card.Header style={{ fontSize: '1.4rem', marginBottom: '.5rem'}}>
                                {work.name}
                              </Card.Header>
                              <Card.Meta>
                                {dateFormat(work.created, "mmmm dS, yyyy, h:MM:ss TT")}
                              </Card.Meta>
                            </div>
                            <div>
                              <Button color='violet' as={Link} to={`/works/${work.cid}`}>
                                View
                              </Button>
                            </div>
                          </div>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))
                : <p className="home__message">
                    No Bounties Yet
                  </p>
              }
            </Grid.Row>
          </Grid>
      }
    </Container>
  )
}

export default CodeWorks;
