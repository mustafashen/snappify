'use server'

import { getCustomer, updateCustomer } from "lib/shopify";
import { Customer } from "lib/shopify/types";
import { cookies } from "next/headers"

export async function customerGet() {
  const customerAccessToken = cookies().get('accessToken')?.value
  let customer;

  if (customerAccessToken) {
    customer = await getCustomer({customerAccessToken})
  } else {
    return 'No access token found'
  }

  if (customer) {
    return customer
  } else {
    return 'No customer found'
  }
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