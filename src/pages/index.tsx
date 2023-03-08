import type { NextPage } from 'next';
import { Header } from '../components/Header';
import { client } from '../libs/client';
import { Post } from '../types/blog';

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "posts" });
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
      <ul>
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.title}</p>
            <p>{post.publishedAt}</p>
            <p>{post.description}</p>
          </div>
        ))}
      </ul>
    </>
  )
}

export default Home;