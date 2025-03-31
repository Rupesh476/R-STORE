import React,{useState,useEffect} from 'react'
import './Order.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import {assets} from "../../assets/assets.js";

const Orders = ({url}) => {

  const[orders,setOrders]=useState([]);

  const fetchAllOrders = async () => {
    try {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data); // Set the orders array
            console.log("Orders Data:", response.data.data); // Debugging
        } else {
            toast.error("Error fetching orders");
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
if (response.data.success){
  await fetchAllOrders();
}
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])


  return (
    <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + " , ";
                                    }
                                })}
                                
                                
                            </p>
                            <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                            <div className="order-item-address">
                              <p>{order.address.street+","}</p>
                              <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                          <option value="Food Processing">Food Processing</option>
                          <option value="On the way">On the way</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}
        </div>
    </div>
  )
}

export default Orders