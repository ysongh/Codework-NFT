import React , { useEffect, useState } from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';

function CodeList({ code, walletAddress, payCoder, codeworkNFTBlockchain, userWorks }) {
  const [previewHash, setPreviewHash] = useState('');
  const [codeHash, setCodeHash] = useState('');

  useEffect(() => {
    const getPreviewFileHash = async () => {
      const data = await codeworkNFTBlockchain.methods.tokenURI(code.nftId).call();
      console.log(data);
      setPreviewHash(data);
    }

    const getCodeHash = async () => {
      const data = await codeworkNFTBlockchain.methods.getCodeURLByNFTId(code.nftId).call();
      console.log(data);
      setCodeHash(data);
    }

    if(codeworkNFTBlockchain && code.nftId){
      getPreviewFileHash();
      getCodeHash();
    }
  }, [code, codeworkNFTBlockchain, userWorks])
  return (
    <Grid.Column key={code.codeId} style={{marginBottom: '1rem'}}>
      <Card color='orange'>
        <Card.Content>
          <Card.Description>
            {code.from.substring(0,8)}...{code.from.substring(34,42)}
          </Card.Description>
          <Card.Meta>Owner</Card.Meta>
          <p style={{marginTop: '.5rem'}}>{code.email}</p>
          <br />
          <Card.Header>{window.web3.utils.fromWei(code.price, 'Ether')} ETH</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://ipfs.fleek.co/ipfs/" + previewHash}
            >
              <Button basic color='violet' fluid>
                See Work
              </Button>
            </a>
            {code.viewer === walletAddress ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://ipfs.fleek.co/ipfs/" + codeHash}
              >
                <Button basic color='teal' fluid>
                  Download Code
                </Button>
              </a>
            ) : (
            <Button basic color='teal' onClick={() => payCoder(code.codeId, code.price)} fluid>
              Pay to get code
            </Button>
            )}
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default CodeList;
