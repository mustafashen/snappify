'use client'
import { Combobox } from '@headlessui/react'
import AddToCart from 'components/cart/add-to-cart'
import { Product, ProductVariant } from 'lib/shopify/types'
import { useState } from 'react'
import { ChevronDown } from 'react-feather'

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
      <p>{productInfo.description}</p>
      <Combobox
        value={selectedVariant}
        onChange={setSelectedVariant}>
        <div className='w-full max-w-xs'>
          <div
            className='flex flex-row flex-nowrap justify-between'>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(selectedVariant: ProductVariant) => selectedVariant.title}/>
            <Combobox.Button>
              <ChevronDown />
            </Combobox.Button>
          </div>
          <Combobox.Options>
            {filteredVariants.map((variant: ProductVariant) => (
              <Combobox.Option key={variant.id} value={variant}>
                {variant.title}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      <div className='card-actions'>
        <AddToCart variant={selectedVariant}/>
      </div>
    </div>

  )
}
