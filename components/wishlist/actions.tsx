'use server';

import { getProduct } from "lib/shopify";
import { cookies } from "next/headers"

export async function createWishlist() {
  cookies().set('wishlist', '[]')
  return cookies().get('wishlist')
}

export async function toggleItem(productHandle: string) {
  const wishlist = cookies().get('wishlist') ? cookies().get('wishlist') : await createWishlist()
  
  let wishlistItems: string[];
  if (wishlist) {
    wishlistItems = JSON.parse(wishlist.value)

    console.log(wishlistItems)
    const lineIndex = wishlistItems.findIndex((item: string) => item === productHandle)
    if (lineIndex === -1) wishlistItems.push(productHandle)
    else if (lineIndex > -1) wishlistItems.splice(lineIndex, 1)
    console.log(wishlistItems)
    cookies().set('wishlist', JSON.stringify(wishlistItems))
  } 
}

export async function getWishlist() {
  const wishlist = cookies().get('wishlist') ? cookies().get('wishlist') : undefined

  if (wishlist) return JSON.parse(wishlist.value)
  else return []
}

export async function getWishlistProduct(productHandle: string) {
  console.log(productHandle)
  return await getProduct(productHandle)
}