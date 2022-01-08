import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTStorage, File } from 'nft.storage';
import { Container, Message, Card, Form, Label, Button, Icon } from 'semantic-ui-react';

import { NFTStorageAPIKey } from '../config';
import Spinner from '../components/common/Spinner';
import TextEditor from '../components/TextEditor';

const apiKey = NFTStorageAPIKey;
const client = new NFTStorage({ token: apiKey })

function AddBounty() {
  const history = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      setErrors({});

      if(!name){
        setErrors({name: true});
        return;
      }
      if(!description){
        setErrors({description: true});
        return;
      }

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

      history('/');
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  const removeFile = fileName => {
    setImages(images.filter(image => image.fileName !== fileName));
  }

  return (
    <Container>
      <Card centered style={{ width: '600px'}} color='purple'>
        <Message
          attached
          color="violet"
          header='Need something to be build by developers?'
          content='Fill the details below'
        />
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Title *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <Label basic color='red' pointing>
                Please enter a title
              </Label>}
            </Form.Field>

            <Form.Field>
              <label>Upload images (Images you upload will be public and cannot be remove)</label>
              <label htmlFor="img" className="btn-file">
                <Icon name='upload' style={{ fontSize: '1.25rem'}} />
              </label>
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

            {/* <Form.Field>
              <Form.TextArea
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any requirements on what you need *" />
              {errors.description && <Label basic color='red' pointing style={{ marginTop: '0' }}>
                Please enter a detail of what you need
              </Label>}
            </Form.Field> */}

            <Form.Field>
              <label>Description</label>
              <TextEditor description={description} setDescription={setDescription} />
            </Form.Field>
                    
            <Button
              type='submit'
              color="violet"
              onClick={upload}
            >
              Create Post
            </Button>
            
            {loading && <Spinner text="Creating..." />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default AddBounty;
