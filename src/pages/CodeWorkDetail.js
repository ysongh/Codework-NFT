import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Button } from 'semantic-ui-react';
import moment from 'moment';

import CodeModal from '../components/CodeModal';

function CodeWorkDetail({ walletAddress, codeworkNFTBlockchain }) {
  const { cid, id } = useParams();
  const [work, setWork] = useState({});
  const [metadata, setMetadata] = useState({});
  const [userWorks, setUserWorks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getWork = async () => {
      const data = await codeworkNFTBlockchain.methods.workList(id).call();
      console.log(data);
      setWork(data);
    }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${cid}/metadata.json`);
      data = await data.json();
      console.log(data);
      setMetadata(data);
    }

    const getUserWorks = async () => {
      const codeCount = await codeworkNFTBlockchain.methods.codeCount().call();
      const temp = [];
      for (let i = 1; i <= codeCount; i++) {
        const code = await codeworkNFTBlockchain.methods.codeworkList(i).call();
        if(code.workId === id) temp.push(code);
      }
      console.log(temp)
      setUserWorks(temp);
    }

    if(cid) getMetadata();
    if(codeworkNFTBlockchain){
      getWork();
      getUserWorks();
    }
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{metadata.name}</h2>
            <p>{moment.unix(work.date).format('M/D/Y h:mm:ss A')}</p>
          </div>
          <Card.Description>
            {metadata.description}
          </Card.Description>
          <br />
          <img src={getImage(metadata.image)} alt="Design" style={{width: '50%'}} />
          <br />
          <Button color="violet" onClick={() => setOpen(true)}>
            Add your code
          </Button>
        </Card.Content>
      </Card>

      <h2>Submission</h2>
      <Grid columns={3}>
        <Grid.Row>
          {userWorks.map(code => (
            <Grid.Column key={code.codeId} style={{marginBottom: '1rem'}}>
              <Card color='orange'>
                <Card.Content>
                  <Card.Header>{code.price} ETH</Card.Header>
                  <Card.Description>
                    {code.from}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://storageapi.fleek.co/ysongh-69207-team-bucket/" + code.codeURL}
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
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      
      <CodeModal
        open={open}
        setOpen={setOpen}
        id={id}
        walletAddress={walletAddress}
        codeworkNFTBlockchain={codeworkNFTBlockchain}
        userWorks={userWorks}
        setUserWorks={setUserWorks} />
    </Container>
  )
}

export default CodeWorkDetail;