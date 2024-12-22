'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPaginationCollection, GET_ARTICLE_LIST } from '~/graphql';

interface Article {
  sys: { id: string };
  slug: string;
  title: string;
  previewImg: { url: string };
}

const InfiniteScrollArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0); // Tracks the current offset for pagination
  const [total, setTotal] = useState(0); // Total number of items in the collection

  const PAGE_SIZE = 5; // Number of articles per page
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMounted = useRef(false); // Tracks if the initial load has occurred

  const loadArticles = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const { items, total: fetchedTotal } = await fetchPaginationCollection<Article>(
        'articleCollection',
        `${GET_ARTICLE_LIST}`,
        { skip, limit: PAGE_SIZE },
      );

      // Set total only on the first request
      if (total === 0) {
        setTotal(fetchedTotal);
      }

      // Add new items to the state
      setArticles((prev) => [...prev, ...items]);

      // Update pagination states
      setSkip((prev) => prev + PAGE_SIZE);

      // Check if there are more items to fetch
      if (skip + PAGE_SIZE >= fetchedTotal) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [skip, isLoading, hasMore, total]);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadArticles();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadArticles, hasMore, isLoading],
  );

  useEffect(() => {
    // Ensure the initial load only happens once
    if (!hasMounted.current) {
      hasMounted.current = true;
      loadArticles();
    }
  }, [loadArticles]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 p-4 md:p-0 lg:grid-cols-2">
        {articles.map(({ sys, slug, title, previewImg }, index) => (
          <div
            key={sys.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg"
            ref={index === articles.length - 1 ? lastArticleRef : null}
          >
            <Link href={`/${sys.id}`}>
              <div className="relative w-full h-[250px]">
                <Image src={previewImg.url} alt={title} fill className="object-cover" />
              </div>
              <h2 className="p-4 font-bold">{title}</h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {isLoading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollArticles;
