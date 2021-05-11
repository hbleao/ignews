import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import S from './styles.module.scss'

import { api } from '@/services/api'
import { getStripeJs } from '@/services/stripe-js'

type SubscribeButtonProps = {
  priceId: string;
} 

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const [session] = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github');
      return;
    };

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button type="button" className={S.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}