import React from 'react'

function FormsScreenLayout({ title, children }) {
  return (
    <div className='bg-[#5c6aed] min-h-screen flex flex-col'>
        <div
          className='flex flex-col justify-center bg-[#f1f1fb] px-6 lg:px-8 pb-8 w-fit h-fit mx-auto my-auto rounded-md'
        >
          <div className='sm:mx-auto sm:w-full'>
            <h2 className='mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              {title}
            </h2>
          </div>
          {children}
          </div>
          </div>
  )
}

export default FormsScreenLayout