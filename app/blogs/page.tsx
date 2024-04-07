import { Blog } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import articlePlaceholderImage from '../../public/static/image/article-placeholder.jpg'
import { getBlogs } from "lib/shopify";

export const metadata = {
  title: 'Stories',
  description: 'Blogs and articles from us'
}

export default async function page() {
  const blogs = await getBlogs({first: 250})
  return (
    <div className='card lg:max-w-[60vw] m-auto mt-10 bg-base-200'>
      <div className='card-body'>
        <h1 className="card-title text-3xl py-6">Stories</h1>
        <ul className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        {
          blogs.map((blog: Blog) => (
            <li
              className='animate-fade-up' 
              key={blog.handle}>
              <Link
                href={{
                  pathname: `/blogs/${blog.handle}`,
                  query: {id: blog.id}
                }}>
                <div className="card bg-base-100 shadow-xl grid grid-rows-5 aspect-[16/10] overflow-hidden h-full">
                  <div className='relative row-span-3'>
                    <figure>
                      <Image
                        src={articlePlaceholderImage}
                        alt={'article image'}
                        fill
                        className='object-cover'
                        />
                    </figure>
                  </div>
                  <div className="card-body row-span-2 flex flex-column justify-center">
                    <h2 className="card-title">{blog.title}</h2>
                  </div>
                </div>
              </Link>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}
