import React from 'react'
import { getWishlist } from './actions'
import WishlistDrawer from './wishlist-drawer'

export default async function Wishlist() {
  const wishlist = (await getWishlist())
  return (
    <WishlistDrawer wishlist={wishlist}/>
  )
}
