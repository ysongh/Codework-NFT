import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Label, Input, Button, Icon } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function AddCode() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const submitCode = async () => {
    try{
      setErrors({});

      if(!name){
        setErrors({name: true});
        return;
      }
      if(!url){
        setErrors({url: true});
        return;
      }
      if(!price){
        setErrors({price: true});
        return;
      }

      setLoading(true);

      history.push('/');
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Container className="bodyHeight">
      <Card centered style={{ width: '600px'}} color='purple'>
        <Card.Content>
          <h1 style={{ fontSize: '1.8rem'}}>Sell your code as NFT</h1>
          <p style={{ fontSize: '1rem', color: 'gray', marginBottom: '2rem' }}>
            Fill the details below
          </p>
          <Form>
            <Form.Field>
              <label>Title *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <Label basic color='red' pointing>
                Please enter a title
              </Label>}
            </Form.Field>

            <Form.Field>
              <label>Link to the code *</label>
              <input value={url} onChange={(e) => setURL(e.target.value)} />
              {errors.url && <Label basic color='red' pointing>
                Please enter an URL
              </Label>}
            </Form.Field>

            <Form.Field>
              <label>Price (ETH) *</label>
              <Input labelPosition='right'>
                <Label basic><Icon name='ethereum' /></Label>
                <input text="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <Label>ETH</Label>
                {errors.price && <Label basic color='red' pointing='left'>
                  Please enter a value
                </Label>}
              </Input>
            </Form.Field>

            <Form.Field>
              <Form.TextArea
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </Form.Field>
            
            <Button
              type='submit'
              color="violet"
              onClick={submitCode}
            >
              Create Code NFT
            </Button>
            
            {loading && <Spinner text="Creating..." />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default AddCode;
