'use server'

import { cookies } from "next/headers"

export async function createWishlist() {
  cookies().set('wishlist', '[]')
  return cookies().get('wishlist')
}

export async function toggleItem(productId: string | undefined) {
  const wishlist = cookies().get('wishlist') ? cookies().get('wishlist') : await createWishlist()
  
  let wishlistItems;
  if (wishlist) {
    wishlistItems = JSON.parse(wishlist.value)

    if (wishlistItems.includes(productId)) {
      wishlistItems = wishlistItems.filter((item: string) => item !== productId)
    }

    wishlistItems.push(productId)
    cookies().set('wishlist', JSON.stringify(wishlistItems))
  }

}
