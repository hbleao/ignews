import React from "react"
import Head from 'next/head';
import { GetStaticProps } from "next";

import { SectionHome } from '@/components/Sections';
import { stripe } from "@/services/stripeService";

type HomeProps = {
  product: {
    priceId:string;
    amount: number;
  }
}

const Home = ({ product }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Ignews | Home</title>
      </Head>
      <SectionHome {...product} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const price = await stripe.prices.retrieve('price_1IbCEbKDOJxyRRlT9cpt9BP0', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
} 

export default Home