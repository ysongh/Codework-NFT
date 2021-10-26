import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'semantic-ui-react';

function CodeDetail({ codeworkNFTBlockchain }) {
  const { id } = useParams();
  const [code, setCode] = useState({});

  useEffect(() => {
    const loadCode = async () => {
      let data = await codeworkNFTBlockchain.methods.codeDataList(id).call();
      setCode(data);
    }

    if (codeworkNFTBlockchain) loadCode();
  }, [codeworkNFTBlockchain, id])

  return (
    <Container className="bodyHeight">
      <h1>List of Codes</h1>
      {!codeworkNFTBlockchain
        ? <h4 style={{ color: 'red' }}>Connect to your ethereum wallet</h4>
        : <Card color='orange' fluid>
            <Card.Content>
              <Card.Header>{code.title}</Card.Header>
              <Card.Meta>
                {code.description}
              </Card.Meta>
              <Card.Description>
                <a href={code.url} target="_blank" rel="noopener noreferrer">{code.url}</a>
              </Card.Description>
              <div style={{marginTop: '.7rem', display: 'flex', alignItems: 'center'}}>
                <Button color='violet'>
                  Buy
                </Button>
                <p>{code.price / 10 ** 18} ETH</p>
              </div>
            </Card.Content>
          </Card>
      }
    </Container>
  )
}

export default CodeDetail;