'use server';

import { Product } from "lib/shopify/types";
import { cookies } from "next/headers"

export async function createWishlist() {
  cookies().set('wishlist', '[]')
  return cookies().get('wishlist')
}

export async function toggleItem(product: Product) {
  const wishlist = cookies().get('wishlist') ? cookies().get('wishlist') : await createWishlist()
  
  let wishlistItems: Product[];
  if (wishlist) {
    wishlistItems = JSON.parse(wishlist.value)

    const lineIndex = wishlistItems.findIndex((item: Product) => item.id === product.id)

    if (lineIndex > -1) {
      wishlistItems.splice(lineIndex, 1)
    } else {
      console.log('adding')
      wishlistItems.push(product)
    }
    cookies().set('wishlist', JSON.stringify(wishlistItems))
  } 
}

export async function getWishlist() {
  const wishlist = cookies().get('wishlist') ? cookies().get('wishlist') : undefined

  if (wishlist) return JSON.parse(wishlist.value)
  else return []
}