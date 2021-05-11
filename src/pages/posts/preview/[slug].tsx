import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";

import { SectionPostPreview } from '@/components/Sections';

import { prismicClient } from '@/services/prismic'; 

const PostPreview = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <SectionPostPreview post={post} />
    </>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: "blocking"    
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = await prismicClient.get();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 5)),
    updatedAt: new Date(response.last_publication_date)
      .toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
  };

  return { 
    props: {
      post,
    }
  };
};

export default PostPreview;
