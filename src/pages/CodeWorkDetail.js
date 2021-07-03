import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Button, Placeholder } from 'semantic-ui-react';
import moment from 'moment';

import CodeModal from '../components/CodeModal';
import CodeList from '../components/CodeList';

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

  const payCoder = async (codeId, price) => {
    const data = await codeworkNFTBlockchain.methods
      .payCode(codeId)
      .send({ from: walletAddress, value: price });
    
    console.log(data);
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
          {metadata.image ? <img src={getImage(metadata.image)} alt="Design" style={{width: '50%'}} />
          : <Placeholder style={{ height: 300, width: 400 }}>
              <Placeholder.Image />
            </Placeholder> }
          <br />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button color="violet" onClick={() => setOpen(true)}>
              Add your code
            </Button>
            {work.isCompleted && <p>Completed</p>}
          </div>
        </Card.Content>
      </Card>

      <h2>Submissions</h2>
      <hr />
      <br />

      <Grid columns={3}>
        <Grid.Row>
          {userWorks.map(code => (
            <CodeList
              code={code}
              walletAddress={walletAddress}
              payCoder={payCoder}
              codeworkNFTBlockchain={codeworkNFTBlockchain}
            />
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