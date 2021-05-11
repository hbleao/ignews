import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { SectionPost } from '@/components/Sections';
import { prismicClient } from '@/services/prismic';

const Post = ({ posts }) => {

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <SectionPost posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = await prismicClient.get();

  const { results } = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  });

  const posts = results.map(post => ({
    id: post.id,
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 // 1 hora
  }
}

export default Post;