import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchEntityById } from '~/graphql/utils';
import { GET_ARTICLE_BY_ID } from '~/graphql/queries';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('~/components/atoms/Player'), {
  ssr: false,
});
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await fetchEntityById<Article>('article', GET_ARTICLE_BY_ID, { id: params.id });
  if (!article) {
    return notFound();
  }
  return { title: article.title, description: article.description?.json.content[0]?.value || '' };
}

export default async function Page({ params }: { params: { id: string } }) {
  const article = await fetchEntityById<Article>('article', GET_ARTICLE_BY_ID, { id: params.id });

  if (!article) {
    return notFound();
  }

  // Map of asset IDs to their corresponding data
  const assetMap = new Map<string, { url: string; description?: string }>();
  article.description.links.assets.block.forEach((asset) => {
    assetMap.set(asset.sys.id, { url: asset.url, description: asset.description });
  });

  // Rendering options for rich text
  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assetMap.get(node.data.target.sys.id);
        console.log(asset, ' ASSET');

        if (!asset) {
          console.error('Asset not found for node:', node);
          return null;
        }

        if (asset.url.endsWith('.mp4') || asset.url.endsWith('.webm')) {
          // Render video using VideoPlayer
          console.log('DATA');
          return (
            <div className="flex justify-center items-center">
              <VideoPlayer src={asset.url} />
            </div>
          );
        }

        // Render image with restricted size
        return (
          <div className="flex justify-center">
            <Image
              src={asset.url}
              alt={asset.description || 'Embedded content'}
              width={600}
              height={500}
              className="rounded-lg shadow-md object-cover max-w-[600] max-h-[500]"
            />
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {children}
        </a>
      ),
    },
  };

  console.log(article);

  return (
    <section className="mx-auto py-8 sm:py-16 lg:py-20">
      <article>
        <header className={article.previewImg ? 'text-center' : ''}>
          <p className="mx-auto max-w-3xl px-4 sm:px-6">
            <time dateTime={article.publishDate}>{new Date(article.publishDate).toLocaleDateString()}</time>
          </p>
          <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
            {article.title}
          </h1>
          {article.previewImg && (
            <Image
              src={article.previewImg.url}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 sm:rounded-md lg:max-w-6xl"
              alt={article.previewImg.description || 'Preview image'}
              loading="eager"
              priority
              width={800}
              height={250}
            />
          )}
        </header>
        <div className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl">
          {documentToReactComponents(article.description.json, renderOptions)}
        </div>
        {/* {article.authorCollection?.items.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Authors</h2>
            <ul>
              {article.authorCollection.items.map((author, index) => (
                <li key={index}>{author.fullName}</li>
              ))}
            </ul>
          </div>
        )} */}
      </article>
    </section>
  );
}

interface Article {
  sys: { id: string };
  title: string;
  previewImg?: { url: string; description: string };
  description: {
    json: any;
    links: {
      assets: {
        block: {
          sys: { id: string };
          url: string;
          description?: string;
        }[];
      };
    };
  };
  authorCollection?: { items: { fullName: string }[] };
  publishDate: string;
}
