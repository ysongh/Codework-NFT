import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import fleekStorage from '@fleekhq/fleek-storage-js'

import { fleekAPIKey, fleekAPISecret } from '../config';
import Spinner from './common/Spinner';

function CodeModal({ open, setOpen, cid, walletAddress, codeworkNFTBlockchain, userWorks, setUserWorks }) {
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);

  const getImage = event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    setImageName(file.name);
  }

  const upload = async () => {
    try{
      setLoading(true);
      const uploadedFile = await fleekStorage.upload({
        apiKey: fleekAPIKey,
        apiSecret: fleekAPISecret,
        key: walletAddress + '/' + imageName,
        data: image
      });
      console.log(uploadedFile.key);

      const event = await codeworkNFTBlockchain.methods
        .addCodeToWork(cid, window.web3.utils.toWei(price, 'Ether'), uploadedFile.key)
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
            <label>Price (ETH)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Code (in html file)</label>
            <input type="file" onChange={getImage} />
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
