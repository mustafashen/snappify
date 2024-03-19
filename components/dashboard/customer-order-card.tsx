import { CustomerOrder } from "lib/shopify/types";

export default function CustomerOrderCard({order}: {order: CustomerOrder}) {
  return (
    <li 
    key={order.id}
    className="card card-bordered shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{order.name}</h2>
      <p>
        {order.orderNumber}
      </p>
      <p>
        <span>{order.totalPrice.amount}</span>
        <span>{order.totalPrice.currencyCode}</span>
      </p>
    </div>
  </li>
  )
}
