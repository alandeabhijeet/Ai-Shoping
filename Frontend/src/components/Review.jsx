import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getAuthCookie } from "../utils/cookie.js";
import { useLocation, useNavigate } from "react-router-dom";

const Review = () => {
    const backendUrl = import.meta.env.VITE_URL;
    const token = getAuthCookie();
    const [rating, setRating] = useState(5);
    let navigate = useNavigate()
    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue
    } = useForm();
    const { product_id, order_id, user_id , paymentStatus} = location.state || {};

    async function onSubmit(data) {
        const review = {
          user: user_id,
          rating: data.rating,
          review: data.comment,
          product_id: product_id,
          order_id: order_id,
        };
      
        try {
          const response = await fetch(`${backendUrl}/order/review`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({review}),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || "Failed to submit the review");
            return;
          }
          navigate("/");
        } catch (error) {
          console.error("Error submitting the review:", error);
          alert("An error occurred while submitting your review. Please try again.");
        }
    }
      
    return ( 
        <div>
            {paymentStatus === "Completed" &&
                <div className='p-4 w-full min-h-screen text-stone-50 bg-gray-600 flex flex-col items-center space-y-6'>
                    <h3 className="text-center font-large">Review Order</h3>

                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="mb-4">
                            <textarea
                                className={`w-full p-3 text-black rounded-md border ${errors.comment ? 'border-red-600' : 'border-gray-800'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                rows="4"
                                cols="60"
                                placeholder="Comment"
                                {...register('comment', {
                                    required: 'Comment is required',
                                    minLength: {
                                    value: 1,
                                    message: 'Comment is required',
                                    },
                                })}
                            />
                            {errors.comment && <p className="text-red-600 text-sm">{errors.comment.message}</p>}
                        </div>

                        <div className="mb-4 flex items-center  justify-center ">
                            <label className="text-xl font-semibold mr-2">Rating:</label>
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <svg
                                    key={starIndex}
                                    onClick={() => {
                                        handleStarClick(starIndex);
                                        setValue('rating', starIndex);
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-8 w-8 cursor-pointer ${rating >= starIndex ? "text-yellow-400" : "text-gray-400"}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-1/2 p-3 m-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors flex justify-center mx-auto"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>

                    </form>
                </div>
            }
        </div>
    )
}

export default Review;
