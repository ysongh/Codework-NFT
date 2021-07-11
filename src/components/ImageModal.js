import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

function ImageModal({ openModal, setOpenModal, imageURL }) {
  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
      dimmer='inverted'
      size="large"
    >
      <Modal.Content>
        <Image src={imageURL} alt="Design" fluid />
      </Modal.Content>
      {/* <Modal.Actions>
        <Button onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Actions> */}
    </Modal>
  )
}

export default ImageModal;
