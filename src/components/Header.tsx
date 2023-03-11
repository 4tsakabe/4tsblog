import {
  Box,
  Container,
  Heading,
  chakra,
  Avatar,
  Image,
  HStack,
  shouldForwardProp,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { motion } from 'framer-motion';

export const Header: FC = () => {
  const ChakraMotion = chakra(motion.div, {
    shouldForwardProp: (prop) => {
      return shouldForwardProp(prop) || prop === 'transition';
    },
  });

  return (
    <Box px={4} bgColor='gray.100'>
      <Container maxW='container.md'>
        <HStack as='header' py='4' alignItems='center'>
          <ChakraMotion
            animate={{
              scale: [0, 0, 1, 1],
              rotate: [0, 0, 360, 360],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <Image boxSize='50px' src='https://4ts.dev/100x100.webp' alt='icon' />
          </ChakraMotion>
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
