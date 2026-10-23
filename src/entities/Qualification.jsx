import { useState, useEffect } from "react";
import './entity_list.css'

const Qualification = () => {
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/qualifications")
            .then(response =>{
                if(!response.ok) throw new Error("connection troubles");
                return response.json();
            })
            .then(data => {
                setQualifications(data);
            })
            .catch(error => console.error(error, "error"));
    }, [])

    return (
        <div className="list-content">
            <div className="list-title"> 
                Qualification list ({qualifications.length})
            </div>
            {qualifications.map(qualification => (
                <div key={qualification.id} className="card">
                    <div className="card-id">
                        {qualification.id}
                    </div>
                    
                    <div className="card-content">
                        <p>name: {qualification.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}  

export default Qualification;