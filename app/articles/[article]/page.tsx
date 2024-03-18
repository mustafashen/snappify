import Prose from "components/prose";
import { getArticle } from "lib/shopify";

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
