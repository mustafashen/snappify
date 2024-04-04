'use client'
import { Product } from 'lib/shopify/types'
import { useEffect, useState } from 'react'
import { quickProductQuery } from './actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[] | []>([])
  const [dropdownVisible, setDropdownVisible] = useState(false)

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

  const dropdownVisibility = () => {
    if (query.length > 0 && products.length > 0 && dropdownVisible) return true
  }
  
  return (
    <div className='w-80 h-8 z-10 gap-1 flex flex-col items-center box-border overflow-visible bg-base-100'>
      <label
        onFocus={() => setDropdownVisible(true)}
        onBlur={() => {setTimeout(() => setDropdownVisible(false), 180)}}
        className="input input-bordered input-sm flex items-center gap-2 w-full h-full">
        <input 
          type="text" 
          className="grow h-full bg-base-100" 
          placeholder="Search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}/>
        <Link
          className='btn btn-ghost btn-circle btn-xs'
          href={{
              pathname: `/search`,
              query: {q: query}
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </Link>
      </label>
      {
        dropdownVisibility() ? (
          <ul className='card card-bordered bg-base-100 w-full z-30 animate-fade-down'>
            {
              products.map((product) => {
                return (
                  <li 
                    key={product.id} 
                    value={product.title}
                    className='hover:bg-base-200 py-1 pl-3'>
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
          </ul>) : null
      }
    </div>
  )
}
