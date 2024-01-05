import React from 'react'

function RadioButtons({ radioItems, register, name}) {
  return (
    <div className='flex gap-4'>
        {radioItems.map((item, index) => (
            <div key={item.name}>
            <label key={index} disabled={item?.disabled}>
              <input 
                className='mr-2'
                disabled={item?.disabled}
                type="radio"
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

export default RadioButtons