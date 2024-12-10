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
        if (data.image[0]) formData.append('image', data.image[0]);
    
        try {
            const server1Response = await fetch(`${backendUrl}/product`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!server1Response.ok) {
                const errorData = await server1Response.json();
                console.error('Error adding product to Server 1:', errorData.message || 'Unknown error');
                return;
            }
    
            const server1Result = await server1Response.json();
            console.log('Product added to Server 1:', server1Result);
    
            const productId = server1Result.product._id; 
            const aiData = {
                id: productId, 
                name: data.name,
                category: data.category,
                description: data.description,
                price: data.price,
                stock: data.stock,
            };
    
            const server2Response = await fetch(`http://127.0.0.1:5000/ai/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aiData),
            });
    
            if (!server2Response.ok) {
                const errorData = await server2Response.json();
                console.error('Error adding product to Server 2:', errorData.message || 'Unknown error');
                return;
            }
    
            const server2Result = await server2Response.json();
            console.log('Product added to Server 2:', server2Result);
    
            navigate('/');
        } catch (error) {
            console.error('Error during submission:', error);
        }
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
