import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'semantic-ui-react';

import CodeModal from '../components/CodeModal';

function CodeWorkDetail({ walletAddress, codeworkNFTBlockchain }) {
  const { cid, id } = useParams();
  const [work, setWork] = useState({});
  const [userWork, setUserWork] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getWork = async () => {
      console.log(cid)
      let data = await fetch(`https://ipfs.io/ipfs/${cid}/metadata.json`);
      data = await data.json();
      console.log(data);
      setWork(data);
    }

    const getUserWork = async () => {
      const code = await codeworkNFTBlockchain.methods.codeworkList(id).call();
      console.log(code);
      setUserWork(code);
    }

    if(cid) getWork();
    if(codeworkNFTBlockchain) getUserWork();
  }, [cid, id, codeworkNFTBlockchain]);

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
          <br />
          <Button color="violet" onClick={() => setOpen(true)}>
            Add your code
          </Button>
        </Card.Content>
      </Card>

      <h2>Submission</h2>

      {userWork.from !== '0x0000000000000000000000000000000000000000' && (
        <Card color='orange'>
          <Card.Content>
            <Card.Header>{userWork.price} ETH</Card.Header>
            <Card.Description>
              {userWork.from}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://storageapi.fleek.co/ysongh-69207-team-bucket/" + userWork.codeURL}
                >
                  <Button basic color='violet'>
                    See Work
                  </Button>
              </a>
              
              <Button basic color='teal'>
                Pay and get code
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}
      <CodeModal
        open={open}
        setOpen={setOpen}
        id={id}
        walletAddress={walletAddress}
        codeworkNFTBlockchain={codeworkNFTBlockchain} />
    </Container>
  )
}

export default CodeWorkDetail;