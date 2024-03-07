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
    <div>
      <input 
        type="text"
        value={query}
        onChange={handleChange}
        className="input input-bordered input-sm"
        onKeyDown={handleKeyDown}/>
      <ul className='card absolute top-14'>
        { 
          products ? 
          products.map((product) => {
            return (
              <li key={product.id} value={product.title}>
                <Link
                  href={{
                      pathname: `/product/${product.handle}`,
                      query: { product: JSON.stringify(product) },
                  }}>
                  <h2 className="card-title">{product.title}</h2>
                </Link>
              </li>
            )
          }) : null
        }
      </ul>
    </div>
  )
}
