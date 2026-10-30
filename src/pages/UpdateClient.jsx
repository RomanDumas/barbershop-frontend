import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./UpdateClient.css";

const UpdateClient = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const client = location.state?.client || {
        id: "", firstName: "", lastName: "", phone: "", email: ""
    };

    const [clientData, setClientData] = useState({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
        email: client.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target; //e.target - змінна, name - назва ПОЛЯ, value - його значення
        setClientData(prevData => ({
            ...prevData, //значення всіх полів 
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //зупиняє перезавантаження сторінки
        
        const BACKEND_URL = 'http://localhost:8080/api/clients/' + clientData.id;
        console.log(BACKEND_URL);
        
        try {
            const response = await fetch(BACKEND_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Клієнта успішно збережено на бекенді:", data);
                alert("Клієнта успішно оновлено!");
                
                navigate('/admin'); 
            } else {
                console.error("Сервер повернув помилку:", response.status);
                alert("Помилка сервера. Не вдалося оновити клієнта.");
            }
        } catch (error) {
            console.error("Помилка мережі при відправці запиту:", error);
            alert("Не вдалося з'єднатися з сервером.");
        }
    }

    return (
        <div className="conteiner">
            <div className="tittle">
                update client
            </div>
            <form className="inputs" onSubmit={handleSubmit}>
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
                
                <button type="submit">update</button>
            </form>
        </div>
    )
}

export default UpdateClient;