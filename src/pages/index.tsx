/* src/pages/index.tsx */
import type { NextPage } from 'next'
import { Heading, Container } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Container>
      <Heading as="h1" fontSize="3xl" mt="10">
        こんにちは、Next.js
      </Heading>
    </Container>
  )
}
export default Home
