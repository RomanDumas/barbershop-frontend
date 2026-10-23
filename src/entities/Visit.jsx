import {useState, useEffect} from 'react';
import "./entity_list.css";

const Visit = () =>{
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/visits")
            .then(response => {
                if(!response.ok) throw new Error("connection troubles");
                return response.json();
            })
            .then(data => setVisits(data))
            .catch(error => console.error(error, "error"));
    }, [])

    return (
        <div className='list-content'>
            <div className='list-title'>
                visit list ({visits.length})
            </div>
            {visits.map(visit => (
                <div key={visit.id} className='card'>
                    <div className='card-id'>
                        {visit.id}
                    </div>
                    <div className='card-content'>
                        <p>client full name: {visit.client.firstName} {visit.client.lastName}</p>
                        <p>hairdresser full name: {visit.hairdresser.firstName} {visit.hairdresser.lastName}</p>
                        <p>service name: {visit.service.name}</p>
                        <p>date: {visit.startDate}</p>
                        <p>time: {visit.startTime}-{visit.endTime}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Visit;