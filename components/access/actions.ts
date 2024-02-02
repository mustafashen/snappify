'use server'

import { activateCustomer, createCustomer, createCustomerAccessToken, recoverCustomer, resetCustomer } from "lib/shopify"
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

export async function customerRecover({
    email
  }: {
    email: string
  }) {
    try {
  
      if (email === '') {
        return "Missing required fields"
      }
  
      const payload = await recoverCustomer({email})

      if (payload) return "Recover email sent"
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during recover"
    }
}

export async function customerReset({
    password,
    resetUrl
  }: {
    password: string,
    resetUrl: string
  }) {
    try {
  
      if (!password || !resetUrl || 
        password === '' || resetUrl === '') {
        return "Missing required fields"
      }
  
      const payload = await resetCustomer({password, resetUrl})

      if (payload) return "Password has been reset, Please login with the new password"
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during password reset"
    }
}

export async function customerActivate({
    password,
    activationUrl
  }: {
    password: string,
    activationUrl: string
  }) {
    try {
  
      if (!password || !activationUrl || 
        password === '' || activationUrl === '') {
        return "Missing required fields"
      }
  
      const payload = await activateCustomer({password, activationUrl})

      if (payload) return "Your account has been activated"
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during account activation"
    }
}
