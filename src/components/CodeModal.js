import React, { useState } from 'react';
import { Button, Modal, Form, Input, Label, Icon } from 'semantic-ui-react';
import fleekStorage from '@fleekhq/fleek-storage-js'

import { fleekAPIKey, fleekAPISecret } from '../config';
import Spinner from './common/Spinner';

function CodeModal({ open, setOpen, cid, walletAddress, codeworkNFTBlockchain, userWorks, setUserWorks }) {
  const [price, setPrice] = useState('');
  const [previewFile, setPreviewFile] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const [codeFile, setCodeFile] = useState('');
  const [codeFileName, setCodeFileName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const getPreviewFile = event => {
    const file = event.target.files[0];
    console.log(file);
    setPreviewFile(file);
    setPreviewFileName(file.name);
  }

  const getCodeFile = event => {
    const file = event.target.files[0];
    console.log(file);
    setCodeFile(file);
    setCodeFileName(file.name);
  }

  const upload = async () => {
    try{
      setErrors({});
      

      if(!price){
        setErrors({price: true});
        return;
      }

      setLoading(true);
      const uploadedPreviewFile = await fleekStorage.upload({
        apiKey: fleekAPIKey,
        apiSecret: fleekAPISecret,
        key: walletAddress + '/' + previewFileName,
        data: previewFile
      });
      console.log(uploadedPreviewFile.key);

      const uploadedCodeFile = await fleekStorage.upload({
        apiKey: fleekAPIKey,
        apiSecret: fleekAPISecret,
        key: walletAddress + '/' + codeFileName,
        data: codeFile
      });
      console.log(uploadedCodeFile.key);

      const event = await codeworkNFTBlockchain.methods
        .addCodeToWork(cid, window.web3.utils.toWei(price, 'Ether'), uploadedPreviewFile.key, email, uploadedCodeFile.key)
        .send({ from: walletAddress });
    
      console.log(event);
      let temp = userWorks;
      temp.push(event.events.CodeWorkSubmit.returnValues);
      setUserWorks(temp);
      setOpen(false)
      setLoading(false);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer='inverted'
      size="tiny"
    >
      <Modal.Header>Add your code</Modal.Header>
      <Modal.Content>
        <Form>
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
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Preview of your work (Image)</label>
            <input type="file" onChange={getPreviewFile} />
          </Form.Field>
          <Form.Field>
            <label>Code (in html file)</label>
            <input type="file" onChange={getCodeFile} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button color='black' onClick={upload}>
          Add
        </Button>
      </Modal.Actions>
      {loading && <Spinner text="Creating..." />}
    </Modal>
  )
}

export default CodeModal;
