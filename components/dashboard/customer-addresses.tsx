'use client'
import { useEffect, useState } from "react"
import CustomerAddressCreate from "./customer-address-create"
import { addressGet } from "./actions"
import { CustomerAddress } from "lib/shopify/types"
import CustomerAddressCard from "./customer-address-card"

export default function CustomerAddresses() {
  const [customerAddresses, setCustomerAddresses] = useState<CustomerAddress[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    addressGet({first: 5}).then((response: {Error: {message: string}} | CustomerAddress[]) => {
      if ('Error' in response) {
        setMessage(response.Error.message)
      } else {
        setCustomerAddresses(response)
      }
    })
  }, [])

  return (
    <>
      <div className="card bg-base-100">
        <div className="card-body px-0">
          <div>
            <CustomerAddressCreate/>
          </div>
          <div>
            <ul>
              {
                customerAddresses.map((address: CustomerAddress) => {
                  return (
                    <CustomerAddressCard
                      key={address.id} 
                      address={address}/>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      {
        message ? (
          <div className="toast toast-center">
            <div className="alert alert-error">
              <span>{message}</span>
            </div>
          </div>
        ) : null
      }
    </>
  )
}
