import React, { useState } from "react";

const Sort = ({ onSort }) => {
    const [order, setOrder] = useState('asc');

    const handleSort = (selectedOrder) => {
        setOrder(selectedOrder);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSort(order);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <h1>Control</h1>
            <div className="ml-2">
                <button
                  className="btn btn-primary"
                    type="button"
                    onClick={() => handleSort('asc')}
                >
                    Ascending
                </button>
                <button
                   className="btn btn-primary"
                    type="button"
                    onClick={() => handleSort('desc')}
                >
                    Descending
                </button>
            </div>
            <button  className="btn btn-success" type="submit">
                Submit
            </button>
        </form>
    );
};

export default Sort;
