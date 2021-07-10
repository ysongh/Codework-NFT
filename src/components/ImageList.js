import React from 'react';
import { Grid } from 'semantic-ui-react';

function ImageList({ hash, cid }) {
  return (
    <Grid.Column>
      <img src={`https://ipfs.io/ipfs/${cid}/${hash}`} alt="Design" />
    </Grid.Column>
  )
}

export default ImageList;
