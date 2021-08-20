import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react'

function CardWorkLoading() {
  return (
    <Card.Group doubling itemsPerRow={2} stackable>
      {Array(10).fill(1).map((el, i) => (
        <Card key={i}>
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length='full' />
              </Placeholder.Header>
              <Placeholder.Header>
                <Placeholder.Line length='full' />
              </Placeholder.Header>
            </Placeholder>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

export default CardWorkLoading;