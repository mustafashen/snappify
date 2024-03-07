import { RadioGroup } from '@headlessui/react'
import { ProductOption } from 'lib/shopify/types'

export default function OptionGroup({
  option,
  selectedValue,
  handleValueSelect
}: {
  option: ProductOption,
  selectedValue: string,
  // eslint-disable-next-line no-unused-vars
  handleValueSelect: (optionId: string ,value: string) => void
}) {

  const handleChange = (value: string) => {
    handleValueSelect(option.id, value)
  }
  
  return (
    <div className='mb-8'>
      <RadioGroup 
        key={option.id}
        value={selectedValue}
        onChange={handleChange}>
        <div className='mb-3'>
          <RadioGroup.Label>{option.name} </RadioGroup.Label>
        </div>
        <div className='flex *:mr-2'>
        {
          option.values.map((value: string, index) => (
            <RadioGroup.Option 
              value={value}
              key={option.id + '-' + index}
              className={({ checked }) =>
                `${checked ? 'btn-active' : ''} btn btn-outline btn-sm`
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
