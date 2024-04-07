'use client'
import CustomerOrderCard from "./customer-order-card"
import { CustomerOrder } from "lib/shopify/types"
import { useEffect, useState } from "react"
import { ordersGet } from "./actions"


export default function CustomerOrders() {
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([])

  useEffect(() => {
    ordersGet({first: 10}).then((response: string | CustomerOrder[]) => {
      if (Array.isArray(response)) {
        setCustomerOrders(response)
      } else {
        // handle error
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
    <div className="card">
      <div className="card-body px-0">
        <p>No orders found.</p>
      </div>
    </div>
  )
}
