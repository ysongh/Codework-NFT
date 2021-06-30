import React , { useEffect, useState } from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';

function CodeList({ code, walletAddress, payCoder, codeworkNFTBlockchain }) {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const getHash = async () => {
      const data = await codeworkNFTBlockchain.methods.tokenURI(code.nftId).call();
      console.log(data);
      setHash(data);
    }

    if(codeworkNFTBlockchain) getHash();
  }, [code, codeworkNFTBlockchain])
  return (
    <Grid.Column key={code.codeId} style={{marginBottom: '1rem'}}>
      <Card color='orange'>
        <Card.Content>
          <Card.Header>{window.web3.utils.fromWei(code.price, 'Ether')} ETH</Card.Header>
          <Card.Description>
            {code.from}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {code.viewer === walletAddress ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://storageapi.fleek.co/ysongh-69207-team-bucket/" + hash}
            >
              <Button basic color='violet'>
                See Work
              </Button>
            </a>
          ) : (
          <Button basic color='teal' onClick={() => payCoder(code.codeId, code.price)}>
            Pay to get code
          </Button>
          )}
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default CodeList;
