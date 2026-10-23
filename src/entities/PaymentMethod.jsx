import {useState, useEffect} from 'react'
import './entity_list.css'

const PaymentMethod = () => {
    const [paymentMethods, setPaymentMethod] = useState([]);

    useEffect (() => {
        fetch("http://localhost:8080/api/paymentmethods")
            .then(response =>{
                if(!response.ok) throw new Error("conection troubles");
                return response.json();
            })
            .then(data => {
                setPaymentMethod(data);
            })
            .catch(error => console.error("error", error));
    }, [])

    return (
        <>
            <div className="list-content">
                <div className="list-title"> 
                    payment method list ({paymentMethods.length})
                </div>

                {paymentMethods.map(paymentMethod => (
                    <div key={paymentMethod.id} className="card">
                        <div className='card-id'>
                            {paymentMethod.id}
                        </div>

                        <div className='card-content'>
                            <p>name: {paymentMethod.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
    
}

export default PaymentMethod;