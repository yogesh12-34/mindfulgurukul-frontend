import React from 'react'

function Select({ options, name, register }) {
  return (
    <select {...register(name)} className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'>
    {options.map((option) => (
      <option key={option.name} value={option.name}>
        {option.label}
      </option>
    ))}
  </select>
  )
}

export default Select