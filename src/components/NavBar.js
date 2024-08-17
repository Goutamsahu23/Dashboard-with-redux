import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategorySearchQuery } from '../features/searchSlice';
import { CiSearch } from 'react-icons/ci';


const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        dispatch(setCategorySearchQuery(query));
    };


    return (
        <div className="nav shadow-xl p-4 flex justify-between items-center">
            <p>Home &gt; Dashboard</p>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden shadow-sm w-full max-w-xs">
                <div className="pl-2">
                <CiSearch color='black' size={20} />
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-2 text-gray-700 w-full focus:outline-none"
                />
            </div>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14.5c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zM12 17.5c-4.418 0-8 3.582-8 8v1h16v-1c0-4.418-3.582-8-8-8z"
                    />
                </svg>
            </div>
        </div >
    );
};

export default NavBar;
