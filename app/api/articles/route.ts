import { getArticleCollectionQuery, graphQLClient } from '~/graphql';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const articlesRes = await graphQLClient.request(getArticleCollectionQuery(requestBody.limit));
    console.log(articlesRes, ' articlesRes in server');
    return Response.json({ data: articlesRes });
  } catch (err) {
    console.error(err);
  }
}
