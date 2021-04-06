import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { query } from 'faunadb'

import { stripe } from '@/services/stripeService'
import { fauna } from '@/services/fauna';

type User = {
  ref: {
    id: string,
  },
  data: {
    stripe_custumer_id: string,
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const user = await fauna.query<User>(
      query.Get(
        query.Match(
          query.Index('user_by_email'),
          query.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_custumer_id

    if (!customerId) {
      const stripeCostumer = await stripe.customers.create({
        email: session.user.email,
        //metadata
      })

      await fauna.query(
        query.Update(
          query.Ref(query.Collection('users'), user.ref.id),
          { 
            data: {
              stripe_costumer_id: stripeCostumer.id
            }
          }
        )
      )

      customerId = stripeCostumer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1IbCEbKDOJxyRRlT9cpt9BP0', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
} 