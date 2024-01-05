import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axios } from '../services/axios'
import { IoArrowBack } from 'react-icons/io5'

const ViewDetails = () => {
  const { userId } = useParams()
  const [userDetails, setUserDetails] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/users/${userId}`)
        setUserDetails(response.data)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserDetails()
  }, [userId])

  return (
    <div className='bg-[#5c6aed] min-h-screen p-8'>
      {userDetails ? (
        <div className='bg-[#f1f1fb] p-4 rounded shadow relative'>
          <button
            onClick={() => navigate('/dashboard')}
            className='px-4 py-2 absolute top-2 left-2 rounded-full border-2 bg-indigo-600 flex gap-2 text-white items-center hover:bg-white hover:text-indigo-600 hover:border-indigo-600'
          >
            <IoArrowBack className='text-xl' /> Dashboard
          </button>
          <h2 className='text-2xl font-bold mb-4 text-center'>User Details</h2>
          <div className='mt-16 text-center'>
            <h3 className='text-lg font-semibold mb-2'>{userDetails.name}</h3>
            <p className='text-gray-600 mb-2'>{userDetails.email}</p>
            <p className='text-gray-600'>{userDetails.phone}</p>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  )
}

export default ViewDetails
