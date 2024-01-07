import { Minus, Plus } from 'react-feather'

export default function LineQuantityEdit() {
  return (
    <div className='cart-actions'>
      <div className='join grid grid-cols-3'>
        <button className="join-item btn btn-outline"><Minus/></button>
        <input className='join-item input input-bordered text-center' value={0}/>
        <button className="join-item btn btn-outline"><Plus/></button>
      </div>
    </div>
  )
}
