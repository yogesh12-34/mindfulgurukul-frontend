import React from 'react'

function Checkbox({ options, register, name}) {
  return (
    <div className='flex gap-4'>
        {options.map((item, index) => (
            <div key={item.name}>
            <label key={index} disabled={item?.disabled}>
              <input 
                className='mr-2'
                disabled={item?.disabled}
                type="checkbox"
                name={item.name}
                value={item.name}
                {...register(name)}
              />
              {item.label}
            </label>
          </div>
        ))}
    </div>
  )
}

export default Checkbox