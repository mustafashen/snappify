'use server'

import { deleteCustomerAccessToken } from "lib/shopify"
import { cookies } from "next/headers"

export async function logoutCustomer() {
  const customerAccessToken = cookies().get('accessToken')?.value

  if (!customerAccessToken) {
    return "User not logged in"
  }

  try {
    const res = await deleteCustomerAccessToken({customerAccessToken})
    if (res) {
      cookies().delete('accessToken')
    }

  } catch(error: unknown) {
    console.log(error)
    return 'Error during logout'
  }
}