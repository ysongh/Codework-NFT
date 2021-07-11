import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import ImageModal from '../components/ImageModal';

function ImageList({ hash, cid }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Grid.Column onClick={() => setOpenModal(true)}>
      <img src={`https://ipfs.io/ipfs/${cid}/${hash}`} alt="Design" />
      <ImageModal
         openModal={openModal}
         setOpenModal={setOpenModal}
         imageURL={`https://ipfs.io/ipfs/${cid}/${hash}`} />
    </Grid.Column>
  )
}

export default ImageList;
