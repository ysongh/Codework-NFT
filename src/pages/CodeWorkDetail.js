import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Button, Placeholder } from 'semantic-ui-react';
import moment from 'moment';

import { NFTStorageAPIKey } from '../config';
import CodeModal from '../components/CodeModal';
import CodeList from '../components/CodeList';

function CodeWorkDetail({ walletAddress, codeworkNFTBlockchain }) {
  const { cid, id } = useParams();
  const [work, setWork] = useState({});
  const [metadata, setMetadata] = useState({});
  const [imageHash, setImageHash] = useState("");
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
    
    const getImages = async () => {
      let data = await fetch(`https://api.nft.storage/${cid}`, {
        headers: {
          'Authorization': `Bearer ${NFTStorageAPIKey}`,
          'Content-Type': 'application/json'
        }
      });
      data = await data.json();
      console.log(data);
      setImageHash(data.value.files[0].name);
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

    if(cid){
      getMetadata();
      getImages();
    }
    if(codeworkNFTBlockchain){
      getWork();
      getUserWorks();
    }
  }, [cid, id, codeworkNFTBlockchain]);

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
          {imageHash ? <img src={`https://ipfs.io/ipfs/${cid}/${imageHash}`} alt="Design" style={{width: '50%'}} />
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

      <Grid columns={3} doubling>
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