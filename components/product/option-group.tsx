import { RadioGroup } from '@headlessui/react'
import { ProductOption } from 'lib/shopify/types'
import { useState } from 'react'

export default function OptionGroup({
  option
}: {
  option: ProductOption
}) {

  const [selectedValue, setSelectedValue] = useState(option.values[0])

  return (
    <div>
      <RadioGroup 
        key={option.id}
        value={selectedValue}
        onChange={setSelectedValue}>
        <RadioGroup.Label>{option.name}: </RadioGroup.Label>
        <div className='flex *:mr-2'>
        {
          option.values.map((value: string, index) => (
            <RadioGroup.Option 
              value={value}
              key={option.id + '-' + index}
              className={({ checked }) =>
                `${checked ? 'btn-active' : ''} btn`
              }>
              <RadioGroup.Label>{value}</RadioGroup.Label>
            </RadioGroup.Option>
          ))
        }
        </div>
      </RadioGroup>
    </div>
  )
}
