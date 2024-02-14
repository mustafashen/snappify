'use client'
import { Combobox } from '@headlessui/react'
import AddToCart from 'components/cart/add-to-cart'
import { Product, ProductVariant } from 'lib/shopify/types'
import { useState } from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

export default function InfoCard({ productInfo }: { productInfo: Product }) {

  const [selectedVariant, setSelectedVariant] = useState(productInfo.variants[0])
  const [query, setQuery] = useState('')

  const filteredVariants =
    query === ''
      ? productInfo.variants
      : productInfo.variants.filter((variant) => {
        return variant.title.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className='card-body'>
      <h1 className='card-title'>{productInfo.title}</h1>
      <p className='flex-grow-0'>{productInfo.description}</p>
      <div className='flex-grow'>
        <Combobox
          value={selectedVariant}
          onChange={setSelectedVariant}>
          <div className='w-full max-w-xs'>
            <div className='flex flex-nowrap input input-primary'>
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(selectedVariant: ProductVariant) => selectedVariant.title}
                className='w-full'/>
              <Combobox.Button>
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Combobox.Options>
              <ul className='z-[1] menu shadow rounded-box'>
                {filteredVariants.map((variant: ProductVariant) => (
                  <li key={variant.id}>
                    <Combobox.Option 
                      value={variant}>
                      {variant.title}
                    </Combobox.Option>
                  </li>
                ))}
              </ul>
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
      <div className='card-actions'>
          <AddToCart variant={selectedVariant}/>
      </div>
    </div>

  )
}
