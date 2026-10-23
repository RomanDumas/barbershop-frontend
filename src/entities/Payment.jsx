import {useState, useEffect} from 'react';
import "./entity_list.css";

const Payment = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/payments")
        .then(response => {
            if(!response.ok) throw new Error("connection troubles");
            return response.json();
        })
        .then(data => setPayments(data))
        .catch(error => console.error(error, "error"));
    })

    return (
        <div className='list-content'>
            <div className='list-title'>
                payment list ({payments.length})
            </div>
            {payments.map(payment => (
                <div key={payment.id} className='card'>
                    <div className='card-id'>
                        {payment.id}
                    </div>
                    <div className='card-content'>
                        <p>payment method: {payment.paymentMethod.name}</p>
                        <p>payment status: {payment.isPaid ? "True" : "False"}</p>
                        <p>visit id: {payment.visit.id}</p>    
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
export default Payment;