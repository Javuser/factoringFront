import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateOrder from './CreateOrder';
import AllOrders from './AllOrders'



function App() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = () => {
        axios.get('http://localhost:8080/api/v1/orders/getAll')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders: ', error);
            });
    };



    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateOrder />} />
                <Route path="/getAll" element={<AllOrders orders={orders} />} />
            </Routes>
        </Router>
    );
}

export default App;
