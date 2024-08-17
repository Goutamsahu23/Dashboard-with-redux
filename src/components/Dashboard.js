import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import AddWidgetModal from './AddWidgetModal';
import { SlRefresh } from "react-icons/sl";
import { IoMdMore } from "react-icons/io";
import { BsFillClockFill } from 'react-icons/bs';

const Dashboard = () => {
    const categories = useSelector(state => state.widgets.categories);
    const categoryQuery = useSelector(state => state.search.categoryQuery);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [filterRange, setFilterRange] = useState('Last 2 days');
    const filteredCategories = categories.filter(category => {
        // if category name match the search query(Check)
        const categoryMatches = category.name.toLowerCase().includes(categoryQuery.toLowerCase());
        return categoryMatches;
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleFilterChange = (event) => {
        setFilterRange(event.target.value);
        // no filter logic 
    };

    const refreshPage = () => {
        console.log('Page refreshed');
    };

    return (
        <div>
            <div className='bg-gray-100 p-8'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-4 text-justify'>CNAPP Dashboard</h1>
                    <div className='flex space-x-2'>
                        <button
                            onClick={openModal}
                            className="bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            + Add Widget
                        </button>
                        <button
                            onClick={refreshPage}
                            className="hidden md:flex bg-transparent border-2 rounded text-black px-4 py-2 rounded flex items-center"
                        >
                            <SlRefresh />
                        </button>
                        <button
                            onClick={() => { }}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded flex items-center"
                        >
                            <IoMdMore />
                        </button>
                        <div className='hidden md:flex bg-white border-2 border-blue-700 pl-2 items-center gap-2 rounded'>
                            <BsFillClockFill color='blue' />
                            <select
                                value={filterRange}
                                onChange={handleFilterChange}
                                className="hidden md:flex border-t border-b border-r border-l-2 px-4 py-3 text-blue-700 border-s-blue-700"
                            >
                                <option value="Last 2 days">Last 2 days</option>
                                <option value="Last 7 days">Last 7 days</option>
                                <option value="Last 30 days">Last 30 days</option>
                            </select>
                        </div>



                    </div>
                </div>

                {filteredCategories.map(category => (
                    <Category key={category.id} category={category} />
                ))}
            </div>
            <AddWidgetModal isOpen={modalIsOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default Dashboard;
