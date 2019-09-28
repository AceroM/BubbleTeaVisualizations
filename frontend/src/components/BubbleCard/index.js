import React from 'react'
import './BubbleCard.scss'

import { Box, Card, Image, Heading, Text } from 'rebass'

function BubbleCard({ image, title, description }) {
  return (
    // <div className="card-container">{children}</div>;
    <Box width={256}>
      <Card
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
        }}
      >
        {image && <Image src={image} />}
        <Box px={2}>
          <Heading as="h3">{title}</Heading>
          <Text fontSize={0}>{description}</Text>
        </Box>
      </Card>
    </Box>
  )
}

export default BubbleCard
