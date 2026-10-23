import {useState, useEffect} from "react";
import "./CreateClient.css";



const CreateClient = () =>{
    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    })

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setClientData(PrevState => ({
            ...PrevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const BACKEND_URL = 'http://localhost:8080/api/clients';

        try{
            const response = await fetch(BACKEND_URL, {
                method: "POSt",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(clientData)
            });

            if(response.ok) {
                const data = await response.json();
                console.log("Клієнта успішно збережено на бекенді:", data);
                alert("Клієнта успішно створено!");

                setClientData({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: ""
                });
            }else {
                console.error("Сервер повернув помилку:", response.status, response.statusText);
                alert("Помилка сервера. Не вдалося зберегти клієнта.");
            } 
        } catch (error) {
        console.error("Помилка мережі при відправці запиту:", error);
        alert("Не вдалося з'єднатися з сервером.");
    }
}


    return (
        <div className="conteiner">
            <div className="tittle">
                create client
            </div>
            <div className="inputs">
                <div className="input">
                    <p>name</p>
                    <input 
                        type="text"
                        name="firstName"
                        value={clientData.firstName}
                        onChange={handleChange} 
                    />
                </div>

                <div className="input">
                    <p>last name</p>
                    <input 
                        type="text" 
                        name="lastName"
                        value={clientData.lastName}
                        onChange={handleChange}
                    />
                </div>


                <div className="input">
                    <p>phone number</p>
                    <input 
                        type="tel" 
                        name="phone"
                        value={clientData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input">
                    <p>email</p>
                    <input 
                        type="email" 
                        name="email"
                        value={clientData.email}
                        onChange={handleChange}
                    />
                </div>
                                
            </div>
            <button onClick={handleSubmit}>create</button>
        </div>
    )
}

export default CreateClient;