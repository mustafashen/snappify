import { getArticles } from "lib/shopify";
import { Article } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import articlePlaceholderImage from '../../../public/static/image/article-placeholder.jpg'
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams
}: {
  searchParams: { id: string }
}): Promise<Metadata> {

  const blogInfo = await getArticles({id: searchParams.id, first: 1});

  if (!blogInfo) return notFound();


  return {
    title: blogInfo.seo.title || blogInfo.title,
    description: blogInfo.seo.description,
  };
}

export default async function page({
  searchParams
  }: {
    searchParams: {
      id: string
    }
  }) {
    
    const blog = await getArticles({first: 250, id: searchParams.id})
    return (
    <div className='card lg:max-w-[60vw] m-auto'>
      <div className='card-body'>
        <h1 className="card-title text-3xl py-12">{blog.title}</h1>
        <ul className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        {
          blog.articles.map((article: Article) => (
            <li
              className='animate-fade-up' 
              key={article.handle}>
              <Link
                href={{
                  pathname: `/articles/${article.handle}`,
                  query: {id: article.id}
                }}>
                <div className="card bg-base-100 shadow-xl grid grid-rows-5 aspect-[16/10] overflow-hidden h-full">
                  <div className='relative row-span-3'>
                    <figure>
                      {article.image ? 
                      (
                      <Image
                        src={article.image.url}
                        alt={article.image.altText}
                        fill
                        className='object-cover'
                      />
                      ) : (
                        <Image
                        src={articlePlaceholderImage}
                        alt={'article image'}
                        fill
                        className='object-cover'
                      />
                      )}
                    </figure>
                  </div>
                  <div className="card-body row-span-2 flex flex-column justify-center">
                    <h2 className="card-title">{article.title}</h2>
                  </div>
                </div>
              </Link>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  );
}
