import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NFTStorage, File } from 'nft.storage';
import { Container, Card, Form, Button, Icon } from 'semantic-ui-react';

import { NFTStorageAPIKey } from '../config';
import Spinner from '../components/common/Spinner';
const apiKey = NFTStorageAPIKey;
const client = new NFTStorage({ token: apiKey })

function AddForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImage = event => {
    const file = event.target.files[0];
    console.log(file);

    setImages([...images, {
      file: file,
      fileName: file.name,
      fileType: file.type
    }]);
  }

  const upload = async () => {
    try{
      setLoading(true);
      console.log(images);

      let sendFiles = [];
      sendFiles.push(new File(
        [JSON.stringify(
          {
            name: name,
            description: description,
          },
          null,
          2
        )], 'metadata.json')
      );
      
      for(let image of images){
        sendFiles.push(new File([image.file], image.fileName, { type: image.fileType }));
      }

      const metadata = await client.storeDirectory(sendFiles);
      console.log(metadata);

      history.push('/');
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  const removeFile = fileName => {
    setImages(images.filter(image => image.fileName !== fileName));
  }

  return (
    <Container className="bodyHeight">
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
              <input id="img" type="file" onChange={getImage} style={{ display: 'none' }}/>
              <div style={{ marginBottom: "1rem" }}></div>
              {images.map((image, index) => (
                <div key={index} className="flex-space-between">
                  <p>{image.fileName}</p>
                  <Button color="red" onClick={() => removeFile(image.fileName)} animated>
                    <Button.Content hidden>Remove</Button.Content>
                    <Button.Content visible>
                      <Icon name='trash' />
                    </Button.Content>
                  </Button>
                </div>
                
              ))}
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
