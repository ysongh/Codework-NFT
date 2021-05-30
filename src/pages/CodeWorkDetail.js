import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'semantic-ui-react';

function CodeWorkDetail() {
  const { cid } = useParams();
  const [work, setWork] = useState({});

  useEffect(() => {
    const getWork = async () => {
      console.log(cid)
      let data = await fetch(`https://ipfs.io/ipfs/${cid}/metadata.json`);
      data = await data.json();
      console.log(data);
      setWork(data);
    }

    if(cid) getWork();
  }, [cid]);

  const getImage = ipfsURL => {
    if(!ipfsURL) return;
    ipfsURL = ipfsURL.split("://");
    return 'https://ipfs.io/ipfs/' + ipfsURL[1];
  }

  return (
    <Container>
      <Card color='orange' fluid>
        <Card.Content>
          <Card.Header>{work.name}</Card.Header>
          <Card.Description>
            {work.description}
          </Card.Description>
          <br />
          <img src={getImage(work.image)} alt="Work" style={{width: '50%'}} />
        </Card.Content>
      </Card>
    </Container>
  )
}

export default CodeWorkDetail;