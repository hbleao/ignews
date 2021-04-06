import S from './styles.module.scss'

import { SubscribeButton } from '@/components'

type SectionHomeProps = {
  priceId:string;
  amount: number;
}

export const SectionHome = ({ amount, priceId }: SectionHomeProps) => {
  return (
    <main className={S.contentContainer}>
      <section className={S.hero}>
        <span>👏🏻 Hey, welcome</span>
        <h1>News about the <span>React</span> word.</h1>
        <p>
          Get access to all the publications <br />
          <span>for {amount} month</span> 
        </p>
        <SubscribeButton priceId={priceId} />
      </section>

      <img src="/images/avatar.svg" alt="A girl coding" width="300" height="400" />
    </main>
  )
}