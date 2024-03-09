'use client'
import { Product } from 'lib/shopify/types'
import { useEffect, useState } from 'react'
import { quickProductQuery } from './actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function MobileSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[] | []>([])
  const [searchVisible, setSearchVisible] = useState('hidden')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase())
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/search?q=${query}`)
    }
  }

  useEffect(() => {
    quickProductQuery({query}).then(products => setProducts(products))
  }, [query])
  
  return (
    <>
      <button
        onClick={() => setSearchVisible('')}
        className='btn btn-square btn-ghost lg:hidden'>
        <MagnifyingGlassIcon className='w-5 h-5'/>
      </button>
      <div className={`absolute w-full h-full top-0 left-0 z-20 bg-base-100 p-4 ${searchVisible}`}>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => setSearchVisible('hidden')}
          className='btn btn-ghost btn-square'>
          <ChevronLeftIcon className='w-5 h-5'/>
        </button>
        <h1 className='text-xl font-semibold leading-none'>
          Search
        </h1>
      </div>
      <label
        className="input input-bordered input flex items-center gap-2 w-full">
        <input 
          type="text" 
          className="grow" 
          placeholder="Search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}/>
        <Link
          onClick={() => setSearchVisible('hidden')}
          className='btn btn-ghost btn-circle btn-md'
          href={{
              pathname: `/search`,
              query: {q: query}
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </Link>
      </label>
      <ul className=''>
        {
          products.map((product) => {
            return (
              <li 
                key={product.id} 
                value={product.title}
                className='hover:bg-base-200 p-4'>
                <Link
                  href={{
                      pathname: `/product/${product.handle}`
                  }}>
                  <p>{product.title}</p>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
    </>
  )
}
