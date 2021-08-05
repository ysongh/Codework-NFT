import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Button } from 'semantic-ui-react';

import { NFTStorageAPIKey } from '../config';
import CodeModal from '../components/CodeModal';
import ImageModal from '../components/ImageModal';
import CodeList from '../components/CodeList';
import ImageList from '../components/ImageList';
import Spinner from '../components/common/Spinner';

function CodeWorkDetail({ walletAddress, codeworkNFTBlockchain }) {
  const { cid, id } = useParams();
  const [metadata, setMetadata] = useState({});
  const [imageHashes, setImageHashes] = useState([]);
  const [userWorks, setUserWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

      let temp = [];
      
      for (let i = 1; i < data.value.files.length; i++) {
        temp.push(data.value.files[i].name)
      }

      setImageHashes(temp);
    }

    const getUserWorks = async () => {
      const codeCount = await codeworkNFTBlockchain.methods.codeCount().call();
      const temp = [];
      for (let i = 1; i <= codeCount; i++) {
        const code = await codeworkNFTBlockchain.methods.codeworkList(i).call();
        console.log(code);
        if(code.workId === cid) temp.push(code);
      }
      console.log(temp)
      setUserWorks(temp);
    }

    if(cid){
      getMetadata();
      getImages();
    }
    if(codeworkNFTBlockchain){
      getUserWorks();
    }
  }, [cid, id, codeworkNFTBlockchain]);

  const payCoder = async (codeId, price) => {
    try{
      setLoading(true);
      const data = await codeworkNFTBlockchain.methods
        .payCode(codeId)
        .send({ from: walletAddress, value: price });
      
      console.log(data);
      setLoading(false);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Container className="bodyHeight">
      <Card color='orange' fluid>
        <Card.Content>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{metadata.name}</h2>
          </div>
          <Card.Description>
            {metadata.description}
          </Card.Description>
          <br />
          <Grid columns={4} doubling>
            <Grid.Row>
              {imageHashes.map((hash, index) => (
                <ImageList key={index} hash={hash} cid={cid} setCurrentImage={setCurrentImage} setOpenImageModal={setOpenImageModal} />
              ))}
            </Grid.Row>
          </Grid>
          <br />
          {codeworkNFTBlockchain &&
            <Button color="violet" onClick={() => setOpen(true)}>
              Add your code
            </Button>}
        </Card.Content>
      </Card>

      <h2>Submissions</h2>
      <hr />
      <br />

      {!codeworkNFTBlockchain 
        ? <p>Connect to your ethereum wallet to see submissions</p>
        : <Grid columns={3} doubling>
            <Grid.Row>
              {userWorks.length 
                ? userWorks.map(code => (
                    <CodeList
                      key={code.codeId}
                      code={code}
                      walletAddress={walletAddress}
                      payCoder={payCoder}
                      codeworkNFTBlockchain={codeworkNFTBlockchain}
                      userWorks={userWorks}
                    />
                  ))
                : <p style={{marginLeft: '14px', marginTop: '7px'}}>No submission yet</p>}
            </Grid.Row>
          </Grid>
      }
      
      <CodeModal
        open={open}
        setOpen={setOpen}
        cid={cid}
        walletAddress={walletAddress}
        codeworkNFTBlockchain={codeworkNFTBlockchain}
        userWorks={userWorks}
        setUserWorks={setUserWorks} />

      <ImageModal
        openImageModal={openImageModal}
        setOpenImageModal={setOpenImageModal}
        imageURL={currentImage} />

      {loading && <Spinner />}
    </Container>
  )
}

export default CodeWorkDetail;