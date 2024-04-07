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
    return 'Error during logout'
  }
}

export async function getCustomerAccessToken() {
  const customerAccessToken = cookies().get('accessToken')?.value

  if (!customerAccessToken) {
    throw new Error('No access token found')
  }

  return customerAccessToken
}