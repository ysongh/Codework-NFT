import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

function CodeModal({ open, setOpen }) {
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const getImage = event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
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
            <label>Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Image URL</label>
            <input type="file" onChange={getImage} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button color='black' onClick={() => setOpen(false)}>
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CodeModal;
