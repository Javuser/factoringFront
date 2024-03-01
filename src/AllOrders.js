import React from 'react';
import {Link, useFetchers} from 'react-router-dom';
import axios from "axios";


function AllOrders({ orders, setOrders }) {

    const onDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/orders/delete/${orderId}`);
            await fetchOrders();
            console.log("Order deleted successfully!");
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/orders/getAll');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders: ', error);
        }
    };

    const handleDelete = (orderId) => {
        onDelete(orderId);
    };

    return (
        <div>
            <h1>All Orders</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>

                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.name}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    handleDelete(order.id);
                                    fetchOrders();
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>


            </table>
            <Link to="/" className="btn btn-primary mt-3">Назад</Link>

        </div>
    );
}

export default AllOrders;
