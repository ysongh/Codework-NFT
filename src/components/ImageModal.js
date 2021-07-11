import React from 'react';
import { Modal, Image, Button } from 'semantic-ui-react';

function ImageModal({ openImageModal, setOpenImageModal, imageURL }) {
  return (
    <Modal
      onClose={() => setOpenImageModal(false)}
      onOpen={() => setOpenImageModal(true)}
      open={openImageModal}
      dimmer='inverted'
      size="large"
    >
      <Modal.Content>
        <Image src={imageURL} alt="Design" fluid />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenImageModal(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ImageModal;
