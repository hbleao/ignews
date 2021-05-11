import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { RichText } from "prismic-dom";

import { SectionPostDetail } from '@/components/Sections';

import { prismicClient } from '@/services/prismic'; 

const Post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <SectionPostDetail post={post} />
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  };

  const prismic = await prismicClient.get(req);

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
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
  }

};

export default Post;
