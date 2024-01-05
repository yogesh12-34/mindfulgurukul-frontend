import React, { useEffect } from 'react'
import { axios } from '../services/axios'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import FormsScreenLayout from '../components/layouts/FormsScreenLayout'
import Label from '../components/label'
import Input from '../components/input'
import { errorToast, successToast } from '../helpers/toastHelper'
import { useForm } from 'react-hook-form'

const EditUser = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`)
        setValue('name', response.data.name)
        setValue('email', response.data.email)
        setValue('phone', response.data.phone)
      } catch (error) {
        errorToast('Error fetching user data:')
      }
    }

    fetchUserData()
  }, [userId, setValue])

  const onSubmit = async (formData) => {
    try {
      await axios.put(`/users/${userId}`, formData)
      successToast('User updated successfully.')
      navigate('/dashboard')
    } catch (error) {
      errorToast(error?.response?.data?.message)
    }
  }

  return (
    <FormsScreenLayout title={'Edit User'}>
      <ToastContainer />
      <div className='mt-4 sm:mx-auto sm:w-full'>
        <form
          noValidate
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label title={'Name'} />
              <Input type={'text'} name={'name'} register={register} required />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label title={'Email'} />
              <Input
                type={'email'}
                name={'email'}
                register={register}
                required
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label title={'Phone'} />
              <Input
                name={'phone'}
                register={register}
                type={'number'}
                required
              />
              {errors.phone && (
                <p className='text-red-500'>{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className='flex gap-4'>
            <button
              onClick={() => navigate('/dashboard')}
              type='submit'
              className='flex w-full justify-center rounded-md bg-gray-300 text-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </FormsScreenLayout>
  )
}

export default EditUser
