import React, { useState, useEffect } from 'react'
import { axios } from '../services/axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import noDataFound from '../assets/images/not-found.jpg'
import 'react-toastify/dist/ReactToastify.css'
import { debounce } from 'lodash'
import { FaEye } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { errorToast } from '../helpers/toastHelper'

const Dashboard = () => {
  const [userData, setUserData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOption, setFilterOption] = useState('az')
  const [fetch, setFetch] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users', {
          params: {
            sort: filterOption,
            search: searchTerm,
          },
        })
        setUserData(response.data)
      } catch (error) {
        errorToast(error?.response?.data?.message)
      }
    }

    const debounceFunc = debounce(fetchUserData, 500)
    fetch && debounceFunc()
  }, [filterOption, searchTerm, fetch])
  console.log(userData)
  useEffect(() => {
    const filterOption = localStorage.getItem('filterOption')
    const searchTerm = localStorage.getItem('searchTerm')
    setFilterOption(filterOption)
    setSearchTerm(searchTerm)
    setFetch(true)
  }, [])

  const handleAddUser = () => {
    navigate('/add-user')
  }

  const handleViewDetails = (userId) => {
    navigate(`/view-details/${userId}`)
  }

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`)
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${userId}`)
        setUserData((prevData) =>
          prevData.filter((user) => user._id !== userId)
        )
        toast.success('User deleted successfully.')
      } catch (error) {
        console.error('Error deleting user:', error)
        toast.error('Error deleting user. Please try again.')
      }
    }
  }

  return (
    <div className='bg-[#5c6aed] min-h-screen p-8'>
      <div className='container mx-auto p-8 rounded-lg bg-[#f1f1fb] min-h-[92vh]'>
        <div className='flex mb-4 flex-col md:flex-row gap-4'>
          <input
            type='text'
            placeholder='Search by Name, Mobile, or Email'
            className='px-4 py-2 border border-gray-300 rounded-full'
            value={searchTerm}
            onChange={(e) => {
              localStorage.setItem('searchTerm', e.target.value)
              setSearchTerm(e.target.value)
            }}
          />

          <select
            className='px-4 py-2 border border-gray-300 rounded-full'
            value={filterOption}
            onChange={(e) => {
              localStorage.setItem('filterOption', e.target.value)
              setFilterOption(e.target.value)
            }}
          >
            <option value='az'>A-Z</option>
            <option value='za'>Z-A</option>
            <option value='lastModified'>Last Modified</option>
            <option value='lastInserted'>Last Inserted</option>
          </select>

          <button
            className='p-2 bg-blue-600 text-white border-2 border-white rounded-full w-full md:w-40 ml-auto font-semibold hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all'
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>

        {userData.length === 0 ? (
          <div className='text-center'>
            <img
              src={noDataFound}
              alt='No Data Found'
              className='mx-auto mb-4'
              width={500}
              height={300}
            />
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16'>
            {userData.map((user) => (
              <div key={user._id} className='bg-white rounded shadow relative'>
                <div className='p-4 mb-8'>
                  <h3 className='text-lg font-semibold mb-2'>{user.name}</h3>
                  <p className='text-gray-600 mb-2'>{user.email}</p>
                  <p className='text-gray-600'>{user.phone}</p>
                </div>
                <div className='mt-4 flex w-full absolute bottom-0'>
                  <button
                    className='bg-sky-500 hover:bg-sky-700 p-2 flex flex-1 items-center justify-center text-white'
                    onClick={() => handleViewDetails(user._id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className='bg-yellow-500 hover:bg-yellow-700 p-2 flex flex-1 items-center justify-center text-white'
                    onClick={() => handleEditUser(user._id)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className='bg-red-500 hover:bg-red-700 p-2 flex flex-1 items-center justify-center text-white'
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  )
}

export default Dashboard
