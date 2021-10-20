import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';

import CardLoading from '../components/common/CardLoading';

function CodeNFTList() {
  const [codes, setCodes] = useState([]);

  return (
    <Container className="bodyHeight">
      <h1>List of Codes</h1>
      <CardLoading />
    </Container>
  )
}

export default CodeNFTList;