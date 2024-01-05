import React from 'react'
import FormsScreenLayout from '../components/layouts/FormsScreenLayout'
import { useForm } from 'react-hook-form'
import Label from '../components/label'
import Input from '../components/input'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from '../services/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()
  const onSubmit = (data) => {
    axios
      .post('/auth/login', data)
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        const token = res.data.data?.token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        navigate('/dashboard')
      })
      .catch((err) =>
        toast.error(err.response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      )
  }
  return (
    <FormsScreenLayout title={'Login To An existing Account'}>
      <ToastContainer />
      <div className='mt-4 sm:mx-auto sm:w-full'>
        <form
          noValidate
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label title={'Email'} />
              <Input type={'email'} name={'email'} register={register} />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label title={'Password'} />
              <Input name={'password'} register={register} type={'password'} />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              LogIn
            </button>
          </div>
        </form>
        <p className='mt-10 text-center text-sm text-gray-500'>
          Not registered yet?{' '}
          <Link
            to='/signup'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Sign up
          </Link>
        </p>
      </div>
    </FormsScreenLayout>
  )
}

export default Login
