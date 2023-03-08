import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { client } from '../libs/client';
import { Post } from '../types/blog'
// 追加
import { PostList } from '../components/PostList';
// 追加
import {
  Container,
  Heading
} from "@chakra-ui/react";

export const getStaticProps = async () => {
  const data = await client.getList({ endpoint: "posts" });
  return {
    props: {
      posts: data.contents,
    },
  };
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Header />
      <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
        <Heading as="h2" fontSize="2xl" fontWeight="bold" mb="8">
          Home
        </Heading>
        <PostList posts={posts} />
      </Container>
    </>
  )
}

export default Home
