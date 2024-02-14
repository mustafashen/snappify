import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
  <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
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
