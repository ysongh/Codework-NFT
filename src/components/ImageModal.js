import React from 'react';
import { Modal, Image, Button } from 'semantic-ui-react';

function ImageModal({ openImageModal, setOpenImageModal, imageURL }) {
  return (
    <Modal
      onClose={() => setOpenImageModal(false)}
      onOpen={() => setOpenImageModal(true)}
      open={openImageModal}
      dimmer='inverted'
      size="small"
    >
      <Modal.Content>
        <Image src={imageURL} alt="Design" fluid />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenImageModal(false)}>
          Close
        </Button>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={imageURL}
        >
          <Button color='teal'>
            View
          </Button>
        </a>
      </Modal.Actions>
    </Modal>
  )
}

export default ImageModal;
