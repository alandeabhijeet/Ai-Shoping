import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuthCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_URL;

const AddProduct = () => {
    let navigate = useNavigate("/")
    const token = getAuthCookie();
    const CATEGORIES = {
        MEN: 'men',
        WOMEN: 'women',
        BAG: 'bag',
        BEAUTY: 'beauty',
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit(data) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        console.log(data.image)
        if (data.image[0]) formData.append('image', data.image[0]); 

        let response = await fetch(`${backendUrl}/product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.message || 'Something went wrong!');
            return;
        }
        navigate("/")
        console.log('Product added successfully');
    }

    return (
        <div className='p-4 w-full min-h-screen flex justify-center items-center bg-gray-700'>
            <div className='w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg'>
                <h2 className='text-center text-3xl font-semibold text-white mb-6'>Add Product</h2>

                <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data" >
                    <div className='mb-4'>
                        <input
                            className={`w-full p-3 rounded-md border ${errors.name ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            type='text'
                            placeholder='Name'
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className='text-red-600 text-sm'>{errors.name.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <select
                            className={`w-full p-3 rounded-md border ${errors.category ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            {...register('category', { required: 'Category is required' })}
                        >
                            <option value="">Select Category</option>
                            <option value={CATEGORIES.MEN}>Men</option>
                            <option value={CATEGORIES.WOMEN}>Women</option>
                            <option value={CATEGORIES.BAG}>Bag</option>
                            <option value={CATEGORIES.BEAUTY}>Beauty</option>
                        </select>
                        {errors.category && <p className='text-red-600 text-sm'>{errors.category.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            className={`w-full p-3 rounded-md border ${errors.description ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            type='text'
                            placeholder='Description'
                            {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && <p className='text-red-600 text-sm'>{errors.description.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            className={`w-full p-3 rounded-md border ${errors.price ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            type='number'
                            placeholder='Price'
                            {...register('price', { required: 'Price is required' })}
                        />
                        {errors.price && <p className='text-red-600 text-sm'>{errors.price.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            className={`w-full p-3 rounded-md border ${errors.stock ? 'border-red-600' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            type='number'
                            placeholder='Stock'
                            {...register('stock', { required: 'Stock is required' })}
                        />
                        {errors.stock && <p className='text-red-600 text-sm'>{errors.stock.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type="file"
                            className="p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            {...register("image", { required: "Image is required" })}
                        />
                        {errors.image && <p className='text-red-600 text-sm'>{errors.image.message}</p>}
                    </div>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors'
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
