'use client'
// import AddToCart from 'components/cart/add-to-cart'
import { Product } from 'lib/shopify/types'
import OptionGroup from './option-group'

export default function InfoCard({ productInfo }: { productInfo: Product }) {

  // const [selectedVariant, setSelectedVariant] = useState(productInfo.variants[0])
  // const [query, setQuery] = useState('')
  
  // const filteredVariants =
  //   query === ''
  //     ? productInfo.variants
  //     : productInfo.variants.filter((variant) => {
  //       return variant.title.toLowerCase().includes(query.toLowerCase())
  //     })


  return (
    <div className='card-body'>
      <h1 className='card-title'>{productInfo.title}</h1>
      <p className='flex-grow-0'>{productInfo.description}</p>
      <div className='flex-grow'>
        {
          productInfo.options.map((option) => (
            <OptionGroup 
              option={option}
              key={option.id}/>
          ))
        }
      </div>
      <div className='card-actions'>
          {/* <AddToCart variant={selectedVariant}/> */}
      </div>
    </div>

  )
}
