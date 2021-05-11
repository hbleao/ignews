import Prismic from '@prismicio/client'

export const prismicClient = {
  get: async (req?: unknown) => {
    return Prismic.client(
      process.env.PRISMIC_ENDPOINT,
      {
        req,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      }
    )
  }
}