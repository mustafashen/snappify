'use client'
import Price from "components/price";
import Image from "next/image";
import Link from "next/link";
import LineRemove from "./line-remove";
import { getWishlistProduct } from "./actions";
import { useEffect, useState } from "react";
import { Product } from "lib/shopify/types";


export default function WishlistLine({productHandle}: {productHandle: string}) {

  const [line, setLine] = useState<Product | null>(null)
  useEffect(() => {
    getWishlistProduct(productHandle).then((product) => {
      if (product) setLine(product)
    })
  },[productHandle])
 

  if (line){
    return (
      <li>
        <div className="card card-side bg-base-100 shadow-xl w-full h-36 grid grid-cols-3 overflow-hidden">
          <div className='relative col-span-1'>
            <figure>
              <Image
                alt={
                  line.featuredImage.altText ||
                  line.title
                }
                src={line.featuredImage.url}
                fill
              />
            </figure>
          </div>
          <div className="card-body col-span-2">
              <Link
                href={`/product/${line.handle}`}
                className='flex-grow'>
                <h2 className="card-title">{line.title}</h2>
                <Price
                  amount={line.priceRange.minVariantPrice.amount}
                  currencyCode={line.priceRange.maxVariantPrice.currencyCode}
                />
              </Link>
              <div className="card-actions">
                <LineRemove 
                  productHandle={line.handle}
                  classname='absolute top-4 right-4'/>
              </div>
          </div>
        </div>
      </li>
    )
  } 
  return null
}
