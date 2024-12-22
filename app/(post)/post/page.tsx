import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import InfiniteScrollArticles from '~/components/widgets/InfiniteScrollArticles';

import { findLatestPosts } from '~/utils/posts';

export const metadata: Metadata = {
  title: 'Важливі Новини',
};

export default async function Home({}) {
  const posts = await findLatestPosts();
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Важливі новини
        </h1>
      </header>
      <InfiniteScrollArticles />
    </section>
  );
}
