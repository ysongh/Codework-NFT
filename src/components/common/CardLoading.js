import React from 'react';
import { Card, Button, Placeholder } from 'semantic-ui-react'

function CardLoading() {
  return (
    <Card.Group doubling itemsPerRow={3} stackable>
      {Array(12).fill(1).map((el, i) => (
        <Card key={i}>
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length='short' />
              </Placeholder.Header>
              <Placeholder.Header>
                <Placeholder.Line length='full' />
              </Placeholder.Header>
            </Placeholder>
            <Button style={{marginTop: '.9rem'}} disabled color='black'>
              View
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

export default CardLoading;