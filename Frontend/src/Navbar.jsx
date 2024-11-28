import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import imageSrc from './assets/Gemini_Generated_Image_3c5ye83c5ye83c5y.jpeg';

const user = {
  name: 'Tom Cook',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Order', to: '/order' },
  { name: 'Ai-Assistance', to: '/ai' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
            
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
            >
              <BellIcon className="size-6" aria-hidden="true" />
            </button>
            <div className="ml-3">
              <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
