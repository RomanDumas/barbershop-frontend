import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './entity_list.css';
import UptadeClient from '../pages/UpdateClient.jsx';

const Client = () =>{

    const [clients, setClients] = useState([]);
    const navigate = useNavigate();


    useEffect (()=>{
        fetch('http://localhost:8080/api/clients')
            .then( response=> {
                if(!response.ok) throw new Error("conection troubles");
                return response.json();
            })
            .then(data =>{
                setClients(data);
            })
            .catch(error => console.error("error", error));
    }, []) 

    const deleteClient = async(id) =>{

        const BACKEND_URL = 'http://localhost:8080/api/clients/' + id;
        try{
            const response = await fetch(BACKEND_URL, {
                method: "DELETE",
            })

            if (response.ok){
                setClients(prevClients => prevClients.filter(client => client.id !== id));
                console.log("Клієнта успішно видалено на бекенді:");
                alert("Клієнта успішно видалено!");
            }
            else {
                console.error("Сервер повернув помилку:", response.status);
                alert("Помилка сервера. Не вдалося видалити клієнта.");
            }
        } catch (error) {
            console.error("Помилка мережі при відправці запиту:", error);
            alert("Не вдалося з'єднатися з сервером.");
        }
    }

    return (
        <div className="list-content">
            
          <div className="list-title"> 
            Client list ({clients.length})
          </div>

            {clients.map(client => (
                <div key={client.id} className="card">
                    <div className="card-id">
                        {client.id}
                    </div>

                    <div className="card-content">
                        <p>full name: {client.firstName} {client.lastName}</p>
                        <p>phone: {client.phone}</p>
                        <p>email: {client.email}</p>
                    </div>

                    <div className="buttons">
                        <button onClick={() => navigate('/updateClient', { state: { client } })}>
                            Update
                        </button>
                        <button onClick={() => deleteClient(client.id)}> Delete </button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Client;