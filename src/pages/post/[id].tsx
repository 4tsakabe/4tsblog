import { client } from '../../libs/client';
import type { Post } from '../../types/blog';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Container, Divider, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../../components/Header';

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  const color = 'black';
  const html_style = {
    '*': {
      mb: 4,
    },
    h1: {
      fontWeight: 'bold',
      color: color,
      base: { fontSize: '2xl' },
      sm: { fontSize: '3xl' },
      mt: { base: 6, sm: 10, md: 12 },
    },
    h2: {
      fontSize: 'xl',
      fontWeight: 'bold',
      color: color,
      mt: { base: 8, sm: 10, md: 12 },
    },
    h3: {
      fontSize: 'xl',
      fontWeight: 'bold',
      color: color,
      mt: 4,
    },
    h4: {
      fontWeight: 'bold',
      color: color,
      base: { fontSize: 'md' },
      sm: { fontSize: 'lg' },
      mt: 4,
    },
    h5: {
      fontSize: 'md',
      fontWeight: 'bold',
      color: color,
      mt: 4,
    },
    p: {
      fontSize: { base: 'sm', sm: 'md' },
      color: color,
      lineHeight: '1.8',
    },
    blockquote: {
      borderLeft: '3px solid',
      borderColor: 'gray.500',
      pl: 4,
      color: color,
    },
    ul:{
      listStyle: 'square',
      ml: 4,
    },
    li: {
      mb: 2,
      color: color,
    },
    a: {
      fontWeight: 'bold',
      color: 'purple.400',
      textDecoration: 'underline',
    },
    'pre code': {
      borderRadius: 10,
      overflow: 'scroll',
      backgroundColor: 'gray.700',
      fontSize: { base: 'xs', sm: 'sm' },
    },
    img: {
      w: '100%',
      h: { base: 200, sm: 300, md: 400 },
      objectFit: 'cover',
      borderRadius: 10,
    },
  };
  return (
    <Box>
      <Header />
      <Container as='main' maxW='container.md' marginTop='4' marginBottom='16'>
        <Stack spacing='8'>
          <Heading as='h1' fontSize='4xl' lineHeight={1.6}>
            {post.title}
          </Heading>
        </Stack>
        <Divider marginY='8' />
        <Box mt={4} sx={html_style}>
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.content}`,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

/* 記事詳細の静的ファイルの作成 */
export const getStaticPaths: GetStaticPaths = async () => {
  // limitがデフォルトで10なので、記事数が10以上になると古い記事が生成されない
  // そのため、一旦totalCountを取得して、limitに指定してリクエストを投げる。
  const data = await client.getList<Post>({ endpoint: 'posts', queries: { fields: 'id' } });
  const totalCount = data.totalCount;
  const allData = await client.getList<Post>({ endpoint: 'posts', queries: { limit: totalCount } });
  const paths = allData.contents.map((content) => `/post/${content.id}`);
  return { paths, fallback: false };
};

// パラメーターから記事詳細データを取得
export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
  if (!params) throw new Error('Error id Not Found');
  const id = params.id;
  const data = await client.getListDetail<Post>({ endpoint: 'posts', contentId: id });
  return {
    props: {
      post: data,
    },
  };
};
