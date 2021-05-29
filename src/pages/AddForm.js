import React, { useState } from 'react';
import { NFTStorage, File } from 'nft.storage';
import { Container, Card, Form, Button } from 'semantic-ui-react';

import { NFTStorageAPIKey } from '../config';
const apiKey = NFTStorageAPIKey;
const client = new NFTStorage({ token: apiKey })

function AddForm({ walletAddress, codeworkNFTBlockchain}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [metadataURL, setMetadataURL] = useState('');

  const getImage = event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    setImageName(file.name);
    setImageType(file.type);
  }

  const upload = async () => {
    const metadata = await client.store({
      name: name,
      description: description,
      image: new File([image], imageName, { type: imageType })
    })
    console.log(metadata.url);
    setMetadataURL(metadata.url);

    const event = await codeworkNFTBlockchain.methods
      .mintCodeworkNFT(metadata.url)
      .send({ from: walletAddress });

    console.log(event);
  }
  return (
    <Container>
      <Card centered style={{ width: '600px'}} color='purple'>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Image URL</label>
              <input type="file" onChange={getImage} />
            </Form.Field>
            <Form.TextArea label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button
              type='submit'
              color="blue"
              onClick={upload}
            >Create</Button>
          </Form>
        </Card.Content>
      </Card>

      <p>{metadataURL}</p>
    </Container>
  )
}

export default AddForm;
