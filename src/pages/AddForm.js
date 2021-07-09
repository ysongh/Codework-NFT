import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NFTStorage, File } from 'nft.storage';
import { Container, Card, Form, Button } from 'semantic-ui-react';

import { NFTStorageAPIKey } from '../config';
import Spinner from '../components/common/Spinner';
const apiKey = NFTStorageAPIKey;
const client = new NFTStorage({ token: apiKey })

function AddForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [loading, setLoading] = useState(false);

  const getImage = event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    setImageName(file.name);
    setImageType(file.type);
  }

  const upload = async () => {
    try{
      setLoading(true);

      const metadata = await client.storeDirectory([
        new File([image], imageName, { type: imageType }),
        new File([JSON.stringify(
          {
            name: name,
            description: description,
          },
          null,
          2
        )], 'metadata.json')
      ])

      console.log(metadata);

      history.push('/');
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }
  return (
    <Container>
      <Card centered style={{ width: '600px'}} color='purple'>
        <Card.Content>
          <h1 style={{ fontSize: '1.8rem'}}>Need something to be build developers?</h1>
          <p style={{ fontSize: '1rem', color: 'gray', marginBottom: '2rem' }}>
            Fill the details below
          </p>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Upload files</label>
              <label htmlFor="img" className="btn-file">Upload</label>
              <input id="img" type="file" onChange={getImage} style={{ display: "none"}}/>
            </Form.Field>
            <Form.TextArea
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any requirements on what you need" />
            <Button
              type='submit'
              color="violet"
              onClick={upload}
            >
              Create
            </Button>
            
            {loading && <Spinner text="Creating..." />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default AddForm;
