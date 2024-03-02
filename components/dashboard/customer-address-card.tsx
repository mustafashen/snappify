import { CustomerAddress } from 'lib/shopify/types'
import CustomerAddressUpdate from './customer-address-update'

export default function CustomerAddressCard({address}: {address: CustomerAddress}) {

  return (
    <li 
      key={address.id}
      className="card card-bordered shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{address.city}/{address.country}</h2>
        <p>
          {address.firstName}, {address.lastName}
        </p>
        <p>
          {address.address1}
          <br/>
          {address.address2}
        </p>
        <div
          className='card-actions'>
          <CustomerAddressUpdate
            address={address}
            />
        </div>
      </div>
    </li>
  )
}
