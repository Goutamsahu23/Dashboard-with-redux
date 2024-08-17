import React, { useState } from 'react';
import Widget from './Widget';
import { useDispatch } from 'react-redux';
import { addWidget } from '../features/widgetsSlice';
import AddWidgetModal from './AddWidgetModal';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { setWidgetSearchQuery } from '../features/searchSlice';
import { MdManageSearch } from 'react-icons/md';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Category = ({ category }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddWidget = (widgetData) => {
        dispatch(addWidget({
            categoryId: category.id,
            widget: widgetData
        }));
        closeModal();
    };



    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        dispatch(setWidgetSearchQuery(query));
    };



    // Filter widgets based on search term
    const filteredWidgets = category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedWidgets = filteredWidgets.filter(widget =>
        category.selectedWidgets.includes(widget.id)
    );

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-2xl relative m-5 ">
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 md:mb-4 text-justify">
                    {category.name}
                </h2>
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm w-full max-w-xs mb-4 md:ml-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search widgets..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-4 py-2 text-gray-700 w-full focus:outline-none"
                    />
                    <button className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 focus:outline-none h-10">
                        <MdManageSearch />
                    </button>
                </div>
            </div>


            <div>
                <Carousel
                    className='c-list'
                    responsive={responsive}
                    swipeable={true}
                    showDots={true}
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                >
                    {selectedWidgets.length > 0 ? (
                        selectedWidgets.map(widget => (
                            <Widget key={widget.id} widget={widget} categoryId={category.id} />
                        ))
                    ) : (
                        <p className="text-gray-600 flex justify-center items-center empty-widget">No widgets selected</p>
                    )}
                    <button
                        onClick={openModal}
                        className="w-[100%] rounded shadow-md flex justify-center absolute top-4  p-[53px] bg-white min-h-7"
                    >
                        <span className='btn'>+ Add Widget</span>
                    </button>
                </Carousel>
            </div>

            <AddWidgetModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onAddWidget={handleAddWidget}
                defaultCategoryId={category.id}
            />
        </div>
    );
};

export default Category;
