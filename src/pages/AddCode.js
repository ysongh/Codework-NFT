import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Message, Card, Form, Label, Input, Button, Icon } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function AddCode({ walletAddress, codeworkNFTBlockchain }) {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const submitCode = async () => {
    try{
      setErrors({});

      if(!title){
        setErrors({title: true});
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

      const event = await codeworkNFTBlockchain.methods
        .addCodeToList(title, url, window.web3.utils.toWei(price, 'Ether'), description)
        .send({ from: walletAddress });
    
      console.log(event);

      setLoading(false);
      history('/codenftlist');
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card centered style={{ width: '600px'}} color='purple'>
        <Message
          attached
          color="violet"
          header='Sell your code as NFT'
          content='Fill the details below'
        />
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
              {errors.title && <Label basic color='red' pointing>
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
            
            {walletAddress
              ? <Button
                  type='submit'
                  color="violet"
                  onClick={submitCode}
                >
                  Create Code NFT
                </Button>
              : <h4 style={{ color: 'red' }}>Connect to your ethereum wallet</h4>
            }
            
            {loading && <Spinner text="Creating..." />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default AddCode;
