import {useState, useEffect} from 'react';
import './entity_list.css'


const Hairdresser = () => {
    const [hairdressers, setHairdressers] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8080/api/hairdressers")
            .then(response => {
                if(!response.ok) throw new Error("connection troubles");
                return response.json();
            })
            .then(data => {
                setHairdressers(data)
            })
            .catch(error => console.error(error, "error"));
    }, [])

    return (
        <div className='list-content'>
            <div className='list-title'>
                hairdresser list ({hairdressers.length})
            </div>
            {hairdressers.map( hairdresser =>(
                <div key={hairdresser.id} className='card'>
                    <div className='card-id'>
                        {hairdresser.id}
                    </div>

                    <div className='card-content'>
                        <p>full name: {hairdresser.firstName} {hairdresser.lastName}</p>
                        <p>start of working: {hairdresser.startOfWorking}</p>
                        <p>qualification: {hairdresser.qualification.name}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
export default Hairdresser;