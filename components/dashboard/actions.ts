'use server'

import { createCustomerAddress, deleteCustomerAccessToken, deleteCustomerAddress, getCustomer, getCustomerAddress, getCustomerOrders, updateCustomer, updateCustomerAddress, updateCustomerDefaultAddress } from "lib/shopify";
import { Customer, CustomerAddress } from "lib/shopify/types";
import { cookies } from "next/headers"

export async function customerGet() {
  const customerAccessToken = cookies().get('accessToken')?.value

  if (!customerAccessToken) {
    throw new Error('No access token found')
  }

  const customer = await getCustomer({ customerAccessToken })

  if (!customer) {
    throw new Error('No customer found')
  }

  return customer
}

export async function customerUpdate({updates}: {updates: Customer}) {
  const customerAccessToken = cookies().get('accessToken')?.value
  let customer;

  if (customerAccessToken) {
    customer = await updateCustomer({updates, customerAccessToken})
  } else {
    return 'No access token found'
  }

  if (customer) {
    return customer
  } else {
    return 'Update was not successful'
  }
} 

export async function customerLogout() {
    try {
      const currentAccessToken = cookies().get('accessToken')?.value
  
      if (typeof currentAccessToken === 'string') {
        const accessToken = currentAccessToken as string
        const payload = await deleteCustomerAccessToken({customerAccessToken: accessToken})
  
        if (payload) {
          cookies().delete('accessToken')
          return payload
        }
      }
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error logging out customer"
    }
}

export async function addressGet({first}: {first: number}) {
    const customerAccessToken = cookies().get('accessToken')?.value
    let addresses;
  
    if (customerAccessToken) {
      addresses = await getCustomerAddress({customerAccessToken, first})
    } else {
      return 'No access token found'
    }
  
    if (addresses) {
      return addresses
    } else {
      return 'No customer found'
    }
}

export async function addressCreate({address}: {address: CustomerAddress}) {
    try {
      const currentAccessToken = cookies().get('accessToken')?.value
  
      if (typeof currentAccessToken === 'string') {
        const accessToken = currentAccessToken as string
        const payload = await createCustomerAddress({customerAccessToken: accessToken, address})
  
        if (payload) {
          return payload
        }
      }
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during address creation"
    }
}

export async function addressDelete({id}: {id: string}) {
    try {
      const currentAccessToken = cookies().get('accessToken')?.value
  
      if (typeof currentAccessToken === 'string') {
        const accessToken = currentAccessToken as string
        const payload = await deleteCustomerAddress({customerAccessToken: accessToken, id})
  
        if (payload) {
          return payload
        }
      }
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during address deletion"
    }
}

export async function addressUpdate({id, address}: {id: string, address: CustomerAddress}) {
    try {
      const currentAccessToken = cookies().get('accessToken')?.value
  
      if (typeof currentAccessToken === 'string') {
        const accessToken = currentAccessToken as string
        const payload = await updateCustomerAddress({customerAccessToken: accessToken, id, address})
  
        if (payload) {
          return payload
        }
      }
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during address update"
    }
}

export async function addressUpdateDefault({id}: {id: string}) {
    try {
      const currentAccessToken = cookies().get('accessToken')?.value
  
      if (typeof currentAccessToken === 'string') {
        const accessToken = currentAccessToken as string
        const payload = await updateCustomerDefaultAddress({customerAccessToken: accessToken, addressId: id})
  
        if (payload) {
          return payload
        }
      }
  
      throw new Error()
  
    } catch (error: unknown) {
      return "Error during default address update"
    }
}

export async function ordersGet({first}: {first: number}) {
  try {
    const currentAccessToken = cookies().get('accessToken')?.value

    if (typeof currentAccessToken === 'string') {
      const payload = await getCustomerOrders({first, customerAccessToken: currentAccessToken})

      if (payload) {
        return payload
      }
    }

    throw new Error()

  } catch (error: unknown) {
    return "Error during default getting orders"
  }
}
