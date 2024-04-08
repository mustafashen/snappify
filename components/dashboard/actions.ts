'use server'

import { createCustomerAddress, deleteCustomerAccessToken, deleteCustomerAddress, getCustomer, getCustomerAddress, getCustomerOrders, updateCustomer, updateCustomerAddress, updateCustomerDefaultAddress } from "lib/shopify";
import { Customer, CustomerAddress } from "lib/shopify/types";
import { cookies } from "next/headers"

export async function customerGet() {
  try {
    const customerAccessToken = cookies().get('accessToken')?.value

    if (!customerAccessToken) {
      throw new Error('No access token found')
    }
  
    const customer = await getCustomer({ customerAccessToken })
  
    if (!customer) {
      throw new Error('No customer found')
    }
  
    return customer
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function customerUpdate({updates}: {updates: Customer}) {
  try {
    const customerAccessToken = cookies().get('accessToken')?.value
    let customer;
  
    if (customerAccessToken) {
      customer = await updateCustomer({updates, customerAccessToken})
    } else {
      throw new Error('No access token found')
    }
  
    if (customer) {
      return customer
    } else {
      throw new Error('Update was not successful')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
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

    throw new Error('Failed to logout')

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function addressGet({first}: {first: number}) {
  try {
    const customerAccessToken = cookies().get('accessToken')?.value
    let addresses;
  
    if (customerAccessToken) {
      addresses = await getCustomerAddress({customerAccessToken, first})
    } else {
      throw new Error('No access token found')
    }
  
    if (addresses) {
      return addresses
    } else {
      throw new Error('No customer found')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
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

    throw new Error('Failed to create new address')

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function addressDelete({id}: {id?: string}) {
    try {
      const currentAccessToken = cookies().get('accessToken')?.value
  
      if (typeof currentAccessToken === 'string' && id) {
        const accessToken = currentAccessToken as string
        const payload = await deleteCustomerAddress({customerAccessToken: accessToken, id})
  
        if (payload) {
          return {payload}
        }
      }
  
      throw new Error('Failed to delete address')
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { 
          Error: {
            message: error.message
          }
        };
      } else {
        return { 
          Error: {
            message: 'An unexpected error occurred'
          }
        };
      }
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

    throw new Error('Failed to update address')

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
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
  
      throw new Error('Failed to set the address to default')
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { 
          Error: {
            message: error.message
          }
        };
      } else {
        return { 
          Error: {
            message: 'An unexpected error occurred'
          }
        };
      }
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

    throw new Error('Failed to get the orders')

  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}
