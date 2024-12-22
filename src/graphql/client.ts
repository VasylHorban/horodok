import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
   `${process.env.CONTENTFUL_URL}/${process.env.CONTENTFUL_SPACE_ID}`,
   {
      headers: {
         Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
      },
   }
)
