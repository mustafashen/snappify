'use server'

import { getLogo } from "lib/shopify"

export async function logoGet() {
  const logo = await getLogo()

  return logo
}