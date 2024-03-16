import { getCoverImage } from 'lib/shopify'
import Link from 'next/link'
import React from 'react'

export default async function Hero() {
  const cover = await getCoverImage()
  return (
  <div className="hero min-h-screen" style={{backgroundImage: `url(${cover.image ? cover.image.url : ''})`}}>
    <div className="hero-overlay bg-opacity-40"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Buy our products</h1>
        <p className="mb-5">Every single one of them.</p>
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
