import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import imageSrc from './assets/Gemini_Generated_Image_3c5ye83c5ye83c5y.jpeg';
import {removeAuthCookie, getAuthCookie } from "./utils/cookie.js";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; 

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function decodeJWT(token) {
  try {
      const parts = token.split('.');
      if (parts.length !== 3) {
          throw new Error('Invalid JWT format');
      }
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      return payload;
  } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
  }
}

export default function Navbar() {
  const token = getAuthCookie() || {};
  let role = null; 

  if (token) {
    const decodedToken = decodeJWT(token);
    role = decodedToken?.role || null; 
  }

  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Order', to: '/order' },
    { name: 'Ai assistant', to: '/ai' },
    ...(role === "admin" ? [{ name: 'Add Product', to: '/add' }] : []),
  ];
  
  let navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = getAuthCookie();
    setIsLoggedIn(token);  
  }, []);

  const handleLogin = () => {
    setShowPopup(false);
    navigate("/login")
  };

  const handleLogout = () => {
    removeAuthCookie();
    setIsLoggedIn(false);
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img alt="Your Company" src={imageSrc} className="size-8" />
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-4 flex items-center space-x-4">
            <div className="ml-3">
              <i
                className="fas fa-user text-2xl text-gray-500 cursor-pointer"
                onClick={togglePopup}
              ></i>
            </div>

            {showPopup && (
              <div className="absolute top-14 right-4 p-2  border bg-white shadow-md rounded-lg w-32 z-10">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-red-500 hover:text-red-700 transition-all"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={handleLogin}
                      className="flex items-center text-gray-800 hover:text-gray-700 transition-all"
                    >
                      <FaSignInAlt className="mr-2" /> Login
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
