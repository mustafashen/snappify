'use server'

import { createCustomer, createCustomerAccessToken } from "lib/shopify"
import { cookies } from "next/headers"

export async function customerRegister({
  email,
  password,
  firstName,
  lastName,
  phone,
  acceptsMarketing,
}: {
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  acceptsMarketing?: boolean,
}) {
  try {

    if (email === '' ||
      password === '' ||
      firstName === '' ||
      lastName === '') {
      return "Missing required fields"
    }

    await createCustomer({
      email,
      password,
      firstName,
      lastName,
      phone,
      acceptsMarketing,
    })

  } catch (error: unknown) {
    console.log(error)
    return "Error logging in customer"
  }
}


export async function customerLogin({
  email,
  password
}: {
  email: string,
  password: string
}) {
  try {

    if (email === '' ||
      password === '') {
      return "Missing required fields"
    }

    const currentAccessToken = cookies().get('accessToken')?.value

    if (!currentAccessToken) {
      const payload = await createCustomerAccessToken({ email, password })

      if (payload.accessToken) {
        cookies().set('accessToken', payload.accessToken)
        return payload
      }
    }

    throw new Error()

  } catch (error: unknown) {
    return "Error logging in customer"
  }
}
