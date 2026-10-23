import { useState, useEffect } from "react";
import './entity_list.css'

const Service = () => {
    const [services, setServices] = useState([]);

    useEffect (() => {
        fetch('http://localhost:8080/api/services')
        .then(response => {
            if(!response.ok) throw new Error("connection troubles");
            return response.json();
        })
        .then(data =>{
            setServices(data)
        })
        .catch(error => console.error(error, "error"));
    }, [])

    return (
        <div className="list-content">
            <div className="list-title"> 
                service list ({services.length})
            </div>    
            {services.map(service => (
                <div key={service.id} className="card">
                    <div className="card-id">
                        {service.id}
                    </div>

                    <div className="card-content">
                        <p>name: {service.name}</p>
                        <p>duration: {service.durationMin} min</p>
                        <p>price: {service.price}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default Service;