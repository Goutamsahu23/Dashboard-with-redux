import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWidgetSelection, addWidget } from '../features/widgetsSlice';

Modal.setAppElement('#root');

const AddWidgetModal = ({ isOpen, onRequestClose, defaultCategoryId }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.widgets.categories);
    const [selectedCategory, setSelectedCategory] = useState(defaultCategoryId);
    const [isAddingNewWidget, setIsAddingNewWidget] = useState(false);
    const [widgetName, setWidgetName] = useState('');
    const [widgetDescription, setWidgetDescription] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', description: '' });

    // form validation
    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!widgetName.trim()) {
            errors.name = 'Widget Name is required';
            formIsValid = false;
        }

        if (!widgetDescription.trim()) {
            errors.description = 'Widget Description is required';
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleToggleWidget = (widgetId) => {
        dispatch(toggleWidgetSelection({ categoryId: selectedCategory, widgetId }));
    };

    const handleAddWidget = () => {
        if (validateForm()) {
            const newWidget = {
                name: widgetName.trim(),
                text: widgetDescription.trim(),
            };
            dispatch(addWidget({
                categoryId: selectedCategory,
                widget: newWidget,
            }));
            setIsAddingNewWidget(false);
            setWidgetName('');
            setWidgetDescription('');
            setErrors({ name: '', description: '' });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Widget"
            className={`z-10 modal-content ${isOpen ? 'modal-content--open' : ''}`}
            overlayClassName="modal-overlay"
        >
            <div className="modal-content-wrapper">
                <div className='bg-blue-700 flex justify-between items-center mb-3 p-2 rounded'>
                    <h2 className="text-white text-xl">Add/Remove Widgets</h2>
                    <div className='flex justify-between gap-2'>
                        <button
                            onClick={() => setIsAddingNewWidget(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded border"
                        >
                            + Add New Widget
                        </button>
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className=" bg-red-500 text-white px-2 py-1  rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
                        >
                            X
                        </button>
                    </div>
                </div>

                {/* Dropdown for Mobile */}
                <div className="relative mb-4 md:hidden">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full text-left"
                    >
                        {categories.find(cat => cat.id === selectedCategory)?.name || 'Select Category'}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded shadow-lg z-10">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${selectedCategory === category.id ? 'bg-gray-300' : ''}`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tabs for Desktop */}
                <div className="hidden md:flex mb-4">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`tab-button ${selectedCategory === category.id ? 'tab-button--active' : ''}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Conditional Rendering */}
                {isAddingNewWidget ? (
                    // Form to Add New Widget
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Widget Name</label>
                            <input
                                type="text"
                                value={widgetName}
                                onChange={(e) => setWidgetName(e.target.value)}
                                className={`w-full p-2 border rounded ${errors.name ? 'border-red-700' : ''}`}
                            />
                            {errors.name && (
                                <p className="text-red-700 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Widget Description</label>
                            <textarea
                                value={widgetDescription}
                                onChange={(e) => setWidgetDescription(e.target.value)}
                                className={`w-full p-2 border rounded ${errors.description ? 'border-red-700' : ''}`}
                            />
                            {errors.description && (
                                <p className="text-red-700 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        <button
                            onClick={handleAddWidget}
                            className="bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Add Widget
                        </button>
                        <button
                            onClick={() => setIsAddingNewWidget(false)}
                            className="ml-4 bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    // Widget Checkboxes
                    <div>
                        {categories.find(cat => cat.id === selectedCategory)?.widgets.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Available Widgets</label>
                                {categories.find(cat => cat.id === selectedCategory)?.widgets.map(widget => (
                                    <div key={widget.id} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`widget-${widget.id}`}
                                            value={widget.id}
                                            checked={categories.find(cat => cat.id === selectedCategory).selectedWidgets.includes(widget.id)}
                                            onChange={() => handleToggleWidget(widget.id)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`widget-${widget.id}`} className="text-gray-700">{widget.name}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className='flex gap-2 justify-end absolute bottom-16 right-4'>
                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="text-blue-700 border border-blue-700 px-4 py-2 rounded mt-4"
                    >
                        Close
                    </button>


                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="bg-blue-700 text-white px-4 py-2 rounded mt-4"
                    >
                        Confirm
                    </button>

                </div>


            </div>
        </Modal>
    );
};

export default AddWidgetModal;
