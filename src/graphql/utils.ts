import { graphQLClient } from '~/graphql';

interface GraphQLResponse<T> {
  [key: string]: {
    items: T[];
  };
}

export async function fetchCollection<T>(
  collectionName: string,
  query: string,
  variables: Record<string, any> = {},
): Promise<T[]> {
  const res = await graphQLClient.request<GraphQLResponse<T>>(query, variables);

  if (res[collectionName] && Array.isArray(res[collectionName].items)) {
    return res[collectionName].items as T[];
  } else {
    throw new Error(`Collection ${collectionName} not found or invalid`);
  }
}

export async function fetchPaginationCollection<T>(
  collectionName: string,
  query: string,
  variables: Record<string, any> = {},
): Promise<{ total: number; items: T[] }> {
  const res = await graphQLClient.request<GraphQLResponse<T>>(query, variables);

  if (res[collectionName] && Array.isArray(res[collectionName].items)) {
    return { items: res[collectionName].items as T[], total: res[collectionName].total };
  } else {
    throw new Error(`Collection ${collectionName} not found or invalid`);
  }
}

export async function fetchEntityById<T>(
  collectionName: string,
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  const res = await graphQLClient.request<GraphQLResponse<T>>(query, variables);

  if (res[collectionName]) {
    return res[collectionName] as T;
  } else {
    throw new Error(`Entity ${collectionName} not found or invalid`);
  }
}
