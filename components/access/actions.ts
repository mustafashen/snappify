'use server'

import { createCustomer, createCustomerAccessToken } from "lib/shopify"
import { cookies } from "next/headers"

export async function customerRegister ({
  email,
  password,
  firstName,
  lastName,
  phone,
  acceptsMarketing,
} : {
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  acceptsMarketing?: boolean,
}) {
  try {
    const payload = await createCustomer({
      email,
      password,
      firstName,
      lastName,
      phone,
      acceptsMarketing,
    })
    
    console.log(payload)

  } catch (error: unknown) {
    console.log(error)
    return "Error logging in customer"
  }
}


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

    if (!currentAccessToken || payload.accessToken) { 
      cookies().set('accessToken', payload.accessToken)
    }
    
  } catch (error: unknown) {
    return "Error logging in customer"
  }
}
