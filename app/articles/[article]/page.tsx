import Prose from "components/prose";
import { HIDDEN_CONTENT_TAG } from "lib/constants";
import { getArticle } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams
}: {
  searchParams: { id: string }
}): Promise<Metadata> {

  const articleInfo = await getArticle({id: searchParams.id});

  if (!articleInfo) return notFound();

  const { url, width, height, altText: alt } = articleInfo.image || {};
  const indexable = !articleInfo.tags.includes(HIDDEN_CONTENT_TAG);

  return {
    title: articleInfo.seo.title || articleInfo.title,
    description: articleInfo.seo.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
        images: [
          {
            url,
            width,
            height,
            alt
          }
        ]
      }
      : null
  };
}

export default async function page({
  searchParams
  }: {
    searchParams: {
      id: string
    }
  }) {
    
    const article = await getArticle({id: searchParams.id})
    return (
    <div className='card lg:max-w-[60vw] m-auto'>
      <div className='card-body'>
        <h1 className="card-title text-3xl py-12">{article.title}</h1>
        {article ? <Prose className="" html={article.contentHtml as string} /> : null}
        {article.author.name}
        {article.publishedAt}
      </div>
    </div>
  );
}
