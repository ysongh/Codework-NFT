import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

function ImageList({ hash, cid, setCurrentImage, setOpenImageModal }) {
  const handelClick = () => {
    setCurrentImage(`https://ipfs.io/ipfs/${cid}/${hash}`)
    setOpenImageModal(true);
  }
  return (
    <Grid.Column className="cursor-pointer" onClick={handelClick}>
      <img src={`https://ipfs.io/ipfs/${cid}/${hash}`} alt="Design" />
    </Grid.Column>
  )
}

export default ImageList;
