'use client'
import CustomerOrderCard from "./customer-order-card"
import { CustomerOrder } from "lib/shopify/types"
import { useEffect, useState } from "react"
import { ordersGet } from "./actions"


export default function CustomerOrders() {
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    ordersGet({first: 10}).then((response: {Error: {message: string}} | CustomerOrder[]) => {
      if ('Error' in response) {
        setMessage(response.Error.message)
      } else {
        setCustomerOrders(response)
      }
    })
  }, [])


  if (customerOrders.length > 0) {
    return (
      <div className="card bg-base-100">
        <div className="card-body px-0">
          <ul>
            {
              customerOrders.map((order: CustomerOrder) => {
                return (
                  <CustomerOrderCard
                    key={order.id} 
                    order={order}/>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="card">
        <div className="card-body px-0">
          <p>No orders found.</p>
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
