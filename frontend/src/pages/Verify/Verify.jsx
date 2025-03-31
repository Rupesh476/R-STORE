import React, { useContext,useEffect } from 'react';
import './Verify.css';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext); // Ensure this is defined
    const navigate = useNavigate();

    const verifyPayment = async () =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myOrders");
        } else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;