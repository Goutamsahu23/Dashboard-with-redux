import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/widgetsSlice';

const Widget = ({ widget, categoryId }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const wordLimit = 5;

    const handleRemoveWidget = () => {
        dispatch(removeWidget({
            categoryId,
            widgetId: widget.id,
        }));
    };

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length <= limit) return text;
        return `${words.slice(0, limit).join(' ')}...`;
    };

    const handleToggleText = () => {
        setIsExpanded(!isExpanded);
    };



    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden relative widget-div m-4 p-5">
            <button
                onClick={handleRemoveWidget}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-2xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
            >
                X
            </button>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 md:text-xl">{widget.name}</h3>
                <div className="flex items-center">
                    <p className="text-gray-700 break-words text-xs md:text-base">
                        {isExpanded ? widget.text : truncateText(widget.text, wordLimit)}
                    </p>
                    {widget.text.split(' ').length > wordLimit && (
                        <button
                            onClick={handleToggleText}
                            className="text-blue-700 underline text-xs md:text-base ml-1"
                        >
                            {isExpanded ? 'Less' : 'More'}
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Widget;
