'use client'
import AddToCart from 'components/cart/add-to-cart'
import { Product } from 'lib/shopify/types'
import OptionGroup from './option-group'
import { useEffect, useState } from 'react'
import Price from 'components/price'
import AddToWishlist from 'components/wishlist/line-add'

export default function InfoCard({ productInfo }: { productInfo: Product }) {

  // Generate initial option state from the first values of every option array
  const generateInitialValues = () => {
    const initialState: {[key: string]: string} = {}
    productInfo.options.forEach((option) => {
      initialState[option.id] = option.values[0] as string
    })

    return initialState
  }

  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>(generateInitialValues())

  const handleValueSelect = (optionId: string, newValue: string) => {
    setSelectedValues((prevState) => ({ ...prevState, [optionId]: newValue }))
  }

  // Set initial variant state from the option state via filtering the specific variant with selected options.
  // We set initial variant from initial option values just to have a single source of truth.
  const setInitialVariant = () => {
    const initialValues = Object.values(selectedValues)
    
    const foundVariant = productInfo.variants.filter((variant) => {
      const variantOptions = variant.title.split('/').map((variant) => variant.trim())
      if (variantOptions.every((option) => initialValues.includes(option))) {
        return true
      }
    })

    return foundVariant[0]
  }

  const [selectedVariant, setSelectedVariant] = useState(setInitialVariant())

  useEffect(() => {
    const currentSelectedValues = Object.values(selectedValues)
    const foundVariant = productInfo.variants.filter((variant) => {
      const variantOptions = variant.title.split('/').map((variant) => variant.trim())
      if (variantOptions.every((option) => currentSelectedValues.includes(option))) {
        return true
      }
    })

    setSelectedVariant(foundVariant[0])
  }, [productInfo.variants, selectedValues])

  return (
    <div className='card-body *:mb-8'>
      <h1 className='card-title'>{productInfo.title}</h1>
      <Price
        className='text-xl font-bold flex-grow-0'
        amount={selectedVariant?.price.amount as string}
        currencyCode={selectedVariant?.price.currencyCode as string}/>
      <div className='flex-grow'>
        { 
          productInfo.variants.length === 1 && productInfo.variants[0]?.title == 'Default Title' ? null : 
          productInfo.options.map((option) => (
            <OptionGroup
              option={option}
              selectedValue={selectedValues[option.id] as string}
              handleValueSelect={handleValueSelect}
              key={option.id}/>
          ))
        }
      </div>
      <div className='flex gap-2'>
        <AddToCart 
          className='flex-grow'
          variant={selectedVariant}/>
        <AddToWishlist product={productInfo}/>
      </div>
    </div>

  )
}
