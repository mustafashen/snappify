'use client'
import AddToCart from 'components/cart/add-to-cart'
import { Product } from 'lib/shopify/types'
import OptionGroup from './option-group'
import { useEffect, useState } from 'react'

export default function InfoCard({ productInfo }: { productInfo: Product }) {

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

  const generateInitialVariant = () => {
    const initialValues = Object.values(selectedValues)
    
    const foundVariant = productInfo.variants.filter((variant) => {
      const variantOptions = variant.title.replaceAll(' ', '').split('/')
      if (variantOptions.every((option) => initialValues.includes(option))) {
        return true
      }
    })

    return foundVariant[0]
  }

  const [selectedVariant, setSelectedVariant] = useState(generateInitialVariant())

  useEffect(() => {
    const currentSelectedValues = Object.values(selectedValues)
    const foundVariant = productInfo.variants.filter((variant) => {
      const variantOptions = variant.title.replaceAll(' ', '').split('/')
      if (variantOptions.every((option) => currentSelectedValues.includes(option))) {
        return true
      }
    })

    setSelectedVariant(foundVariant[0])
  }, [productInfo.variants, selectedValues])

  return (
    <div className='card-body'>
      <h1 className='card-title'>{productInfo.title}</h1>
      <p className='flex-grow-0'>{productInfo.description}</p>
      <div className='flex-grow'>
        {
          productInfo.options.map((option) => (
            <OptionGroup
              option={option}
              selectedValue={selectedValues[option.id] as string}
              handleValueSelect={handleValueSelect}
              key={option.id}/>
          ))
        }
      </div>
      <div className='card-actions'>
        <AddToCart variant={selectedVariant}/>
      </div>
    </div>

  )
}
