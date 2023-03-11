import {
  Box,
  Container,
  Heading,
  chakra,
  Image,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <Box px={4} bgColor='gray.100'>
      <Container maxW='container.md'>
        <HStack as='header' py='4' alignItems='center'>
          <Image boxSize='50px' src='https://4ts.dev/100x100.webp' alt='icon' />
          <NextLink href='/' passHref>
            <Heading as='h1' fontSize='3xl' cursor='pointer'>
              よつメモ
            </Heading>
          </NextLink>
        </HStack>
      </Container>
    </Box>
  );
};
