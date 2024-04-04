import { getCover } from 'lib/shopify'
import Link from 'next/link'
import coverImagePlaceholder from '../../public/static/image/cover-placeholder.jpg'

export default async function Hero() {
  const cover = await getCover()
  return (
  <div className="hero min-h-screen" style={{backgroundImage: `url(${cover && cover.coverImage ? cover.coverImage.image.url : coverImagePlaceholder.src})`}}>
    <div className="hero-overlay bg-opacity-40"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md animate-fade-up">
        <h1 className="mb-5 text-5xl font-bold">{cover.slogan ? cover.slogan : 'Welcome to our store'}</h1>
        <p className="mb-5">{cover.shortDescription ? cover.shortDescription : 'See our catalog'}</p>
        <Link 
          className="btn btn-primary"
          href='/search'>
          Shop Now
        </Link>
      </div>
    </div>
  </div>
  )
}
