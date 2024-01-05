import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../components/input'
import Label from '../components/label'
import RadioButtons from '../components/radioButtons'
import Checkbox from '../components/checkbox'
import Select from '../components/select'
import AutoSelect from '../components/autoSelect'
import { axios } from '../services/axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import FormsScreenLayout from '../components/layouts/FormsScreenLayout'

export default function Signup() {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()
  const onSubmit = (data) => {
    axios
      .post('/auth/signup', data)
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
    <FormsScreenLayout title={'Create a New Account'}>
      <ToastContainer />
      <div className='mt-4 sm:mx-auto sm:w-full'>
        <form
          noValidate
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label title={'Name'} />
              <Input type={'text'} name={'name'} register={register} />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>
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

            <div className='flex flex-col gap-2'>
              <Label title={'Phone'} />
              <Input name={'phone'} register={register} type={'number'} />
              {errors.phone && (
                <p className='text-red-500'>{errors.phone.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label title={'Gender'} />
              <RadioButtons
                name={'gender'}
                register={register}
                radioItems={[
                  {
                    label: 'Male',
                    name: 'male',
                  },
                  {
                    label: 'Female',
                    name: 'female',
                  },
                  {
                    label: 'Others',
                    name: 'others',
                  },
                ]}
              />
              {errors.phone && (
                <p className='text-red-500'>{errors.phone.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label title={'How did you hear about this?'} />
              <Checkbox
                name={'source'}
                register={register}
                options={[
                  {
                    label: 'LinkedIn',
                    name: 'linkedIn',
                  },
                  {
                    label: 'Friends',
                    name: 'friends',
                  },
                  {
                    label: 'Job Portal',
                    name: 'jobPortal',
                  },
                  {
                    label: 'Others',
                    name: 'others',
                  },
                ]}
              />
              {errors.phone && (
                <p className='text-red-500'>{errors.phone.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label title={'City'} />
              <Select
                name={'city'}
                register={register}
                options={[
                  {
                    label: 'Mumbai',
                    name: 'mumbai',
                  },
                  {
                    label: 'Pune',
                    name: 'pune',
                  },
                  {
                    label: 'Ahmedabad',
                    name: 'ahmedabad',
                  },
                ]}
              />
              {errors.phone && (
                <p className='text-red-500'>{errors.phone.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label title={'State'} />
              <AutoSelect
                name={'state'}
                id={'state'}
                placeholder={'Select State'}
                setValue={setValue}
                register={register}
                suggestions={['Gujarat', 'Maharashtra', 'Karnataka']}
              />
              {errors.phone && (
                <p className='text-red-500'>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign up
            </button>
          </div>
        </form>

        <p className='mt-4 text-center text-sm text-gray-500'>
          Already a Member?{' '}
          <Link
            to='/login'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Log In
          </Link>
        </p>
      </div>
    </FormsScreenLayout>
  )
}
