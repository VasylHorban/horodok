import React from 'react';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document, Node, TopLevelBlock } from '@contentful/rich-text-types';
import Image from 'next/image';

import dynamic from 'next/dynamic';
const VideoPlayer = dynamic(() => import('~/components/atoms/Player'), {
  ssr: false,
});

const IMG_KEY = 'img';
const VIDEO_KEY = 'video';

export const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_, children) => {
      return <h1 className="text-4xl text-base-content font-semibold mb-4 mt-8">{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (_, children) => {
      return <h2 className="text-3xl text-base-content font-semibold mb-4 mt-8">{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (_, children) => {
      return <h3 className="text-2xl text-base-content font-semibold mb-4 mt-6">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (_, children) => {
      return <h4 className="text-xl text-base-content font-semibold mb-4 mt-4">{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (_, children) => {
      return <h5 className="text-lg text-base-content font-semibold mb-3 mt-3">{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (_, children) => {
      return <h6 className="text-md text-base-content font-semibold mb-2 mt-2">{children}</h6>;
    },
    [INLINES.HYPERLINK]: (asset, children) => {
      if (Array.isArray(children)) {
        if (children?.includes(IMG_KEY)) {
          return (
            <Image width={800} height={462} alt={`article_image`} src={asset.data.uri} className="rounded-xl mt-8" />
          );
        } else if (children?.includes(VIDEO_KEY)) {
          return <VideoPlayer src={asset.data.uri} />;
        }
      }
      return (
        <a target="_blank" className="underline underline-offset-4 mt-8" href={asset.data.uri}>
          {children}
        </a>
      );
    },
    [BLOCKS.UL_LIST]: (_, children) => {
      return <ul>{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (_, children) => {
      return <ol>{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (_, children) => {
      return <li className="list-disc ml-5">{children}</li>;
    },
    [BLOCKS.PARAGRAPH]: (_, children) => {
      return <p className="text-base leading-8 text-base-content/80">{children}</p>;
    },
  },
};

export function renderWithAssetsOptions(links: any, defaultNode = richTextOptions.renderNode): Options {
  const assetMap = new Map();
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }
  return {
    renderNode: {
      ...defaultNode,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetMap.get(node.data.target.sys.id);
        return <Image priority src={asset.url} alt={asset.description} width={asset.width} height={asset.height} />;
      },
    },
  };
}

export function trimRichTextByCharacters(document: Document, maxChars: number): Document {
  let charCount = 0;

  const trimmedContent = document.content.reduce((acc: Node[], node) => {
    if (charCount >= maxChars) return acc;

    // Only process nodes that have a content array (e.g., paragraphs, headings)
    if ('content' in node && Array.isArray(node.content)) {
      const nodeText = node.content.map((child) => ('value' in child ? child.value : '')).join('');

      const remainingChars = maxChars - charCount;

      if (nodeText.length <= remainingChars) {
        // Add the entire node if it fits within the character limit
        acc.push(node);
        charCount += nodeText.length;
      } else {
        // Partially trim the node's content
        const truncatedText = nodeText.slice(0, remainingChars);
        const truncatedNode = {
          ...node,
          content: [
            {
              ...node.content[0],
              value: truncatedText,
            },
          ],
        };

        acc.push(truncatedNode);
        charCount = maxChars;
      }
    }

    return acc;
  }, [] as Node[]);

  return {
    ...document,
    content: trimmedContent as TopLevelBlock[],
  };
}
