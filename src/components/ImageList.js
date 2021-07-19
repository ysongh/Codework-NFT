import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

function ImageList({ hash, cid, setCurrentImage, setOpenImageModal }) {
  const handelClick = () => {
    setCurrentImage(`https://ipfs.io/ipfs/${cid}/${hash}`)
    setOpenImageModal(true);
  }
  return (
    <Grid.Column className="cursor-pointer" onClick={handelClick}>
      <Image
        src={`https://ipfs.io/ipfs/${cid}/${hash}`}
        label={{ as: 'a', corner: 'right', icon: 'zoom-in' }}
        alt="Design" />
    </Grid.Column>
  )
}

export default ImageList;
