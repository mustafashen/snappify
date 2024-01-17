'use server'

import { createCustomerAccessToken } from "lib/shopify"
import { cookies } from "next/headers"

export async function customerLogin ({
  email,
  password
} : {
  email: string,
  password: string
}) {
  try {
    const payload = await createCustomerAccessToken({email, password})
    
    const currentAccessToken = cookies().get('accessToken')

    if (!currentAccessToken || payload.customerAccessToken.accessToken) { 
      cookies().set('accessToken', payload.customerAccessToken.accessToken)
    }
    
  } catch (error: unknown) {
    return "Error logging in customer"
  }
}
