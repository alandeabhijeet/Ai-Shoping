import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('Form submitted with data:', data);
  }

  return (
    <div className='p-4 w-full min-h-screen flex justify-center items-center bg-gray-700'>
      <div className='w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h2 className='text-center text-3xl font-semibold text-white mb-6'>Sign Up</h2>

        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.name ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text'
              placeholder='Name'
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 1 ,
                  message: 'Name is required',
                },
              })}
            />
            {errors.name && <p className='text-red-600 text-sm'>{errors.name.message}</p>}
          </div>
          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.email ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='email'
              placeholder='Email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.password ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className='text-red-600 text-sm'>{errors.password.message}</p>}
          </div>

          {/* Address Fields */}
          <h3 className='text-xl text-white mb-4'>Address</h3>
          <div className='mb-6'>
            <input
              className={`w-full p-3 rounded-md border ${errors.address?.country ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text'
              placeholder='Country'
              {...register('address.country', { required: 'Country is required' })}
            />
            {errors.address?.country && <p className='text-red-600 text-sm'>{errors.address.country.message}</p>}
          </div>

          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.address?.state ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text'
              placeholder='State'
              {...register('address.state', { required: 'State is required' })}
            />
            {errors.address?.state && <p className='text-red-600 text-sm'>{errors.address.state.message}</p>}
          </div>

          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.address?.city ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text'
              placeholder='City'
              {...register('address.city', { required: 'City is required' })}
            />
            {errors.address?.city && <p className='text-red-600 text-sm'>{errors.address.city.message}</p>}
          </div>

          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.address?.zip ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text'
              placeholder='ZIP'
              {...register('address.zip', { required: 'ZIP code is required' })}
            />
            {errors.address?.zip && <p className='text-red-600 text-sm'>{errors.address.zip.message}</p>}
          </div>


          {/* Street */}
          <div className='mb-4'>
            <input
              className={`w-full p-3 rounded-md border ${errors.address?.street ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text'
              placeholder='Street'
              {...register('address.street', { required: 'Street is required' })}
            />
            {errors.address?.street && <p className='text-red-600 text-sm'>{errors.address.street.message}</p>}
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors'
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-300'>
            Already have an account?{' '}
            <Link to="/login" className='text-indigo-400 hover:underline'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
