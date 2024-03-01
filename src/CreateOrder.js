import React, {useEffect, useState} from 'react';
import axios from "axios";

function CreateOrder() {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ name: "", quantity: 0, price: 0 });
    // const navigate= useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get('http://localhost:8080/api/v1/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders: ', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/v1/orders/', newOrder)
            .then(response => {
                console.log('Order created successfully');
                fetchOrders(); // Обновляем список заказов после успешного создания
                setNewOrder({ name: "", quantity: 0, price: 0 }); // Очищаем форму
                // navigate('/getAll'); // Перенаправляем на страницу списка заказов
                window.location.href = '/getAll'; // Перенаправляем на страницу списка заказов

            })
            .catch(error => {
                console.error('Error creating order: ', error);
            });
    };

    return (
        <div>
            <h1>Create New Order</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={newOrder.name} onChange={handleChange} />
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={newOrder.quantity} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={newOrder.price} onChange={handleChange} />
                </label>
                <button type="submit">Create Order</button>
            </form>

        </div>


    );
}
export default CreateOrder;
