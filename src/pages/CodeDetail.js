import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Statistic, Button, Icon } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function CodeDetail({ walletAddress, codeworkNFTBlockchain }) {
  const { id } = useParams();

  const [code, setCode] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCode = async () => {
      let data = await codeworkNFTBlockchain.methods.codeDataList(id).call();
      setCode(data);
    }

    if (codeworkNFTBlockchain) loadCode();
  }, [codeworkNFTBlockchain, id])

  const purchase = async () => {
    try{
      setLoading(true);
      const data = await codeworkNFTBlockchain.methods
        .buyCodeNFT(id)
        .send({ from: walletAddress, value: code.price });
      
      console.log(data);
      setLoading(false);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Container>
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
              <div style={{marginTop: '.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button color='violet' onClick={purchase}>
                  Buy
                </Button>
                <Statistic size='mini'>
                  <Statistic.Value>{code.price / 10 ** 18} <Icon name='ethereum' /></Statistic.Value>
                  <Statistic.Label>ETH</Statistic.Label>
                </Statistic>
              </div>
              {loading && <Spinner text="Minting NFT..." />}
            </Card.Content>
          </Card>
      }
    </Container>
  )
}

export default CodeDetail;