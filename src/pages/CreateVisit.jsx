import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateClient.css"; // Можеш використати ті ж стилі

const CreateVisit = () => {
    const navigate = useNavigate();

    // Стан для зберігання списків з БД
    const [clients, setClients] = useState([]);
    const [hairdressers, setHairdressers] = useState([]);
    const [services, setServices] = useState([]);

    // Стан для самої форми (має збігатися з VisitRequestDto на бекенді)
    const [visitData, setVisitData] = useState({
        clientId: "",
        hairdresserId: "",
        serviceId: "",
        startDate: "",
        startTime: ""
    });

    // Завантажуємо дані для випадаючих списків при відкритті сторінки
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsRes, hairdressersRes, servicesRes] = await Promise.all([
                    fetch("http://localhost:8080/api/clients"),
                    fetch("http://localhost:8080/api/hairdressers"),
                    fetch("http://localhost:8080/api/services")
                ]);

                setClients(await clientsRes.json());
                setHairdressers(await hairdressersRes.json());
                setServices(await servicesRes.json());
            } catch (error) {
                console.error("Помилка завантаження даних:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisitData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/visits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(visitData)
            });

            if (response.ok) {
                alert("Візит успішно створено!");
                navigate('/admin');
            } else {
                alert("Помилка при створенні візиту.");
            }
        } catch (error) {
            console.error("Помилка мережі:", error);
        }
    };

    return (
        <div className="conteiner">
            <div className="tittle">Створити візит</div>
            <form className="inputs" onSubmit={handleSubmit}>
                <div className="input">
                    <p>Клієнт</p>
                    <select name="clientId" value={visitData.clientId} onChange={handleChange} required>
                        <option value="">Оберіть клієнта...</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                    </select>
                </div>

                <div className="input">
                    <p>Перукар</p>
                    <select name="hairdresserId" value={visitData.hairdresserId} onChange={handleChange} required>
                        <option value="">Оберіть майстра...</option>
                        {hairdressers.map(h => <option key={h.id} value={h.id}>{h.firstName} {h.lastName}</option>)}
                    </select>
                </div>

                <div className="input">
                    <p>Послуга</p>
                    <select name="serviceId" value={visitData.serviceId} onChange={handleChange} required>
                        <option value="">Оберіть послугу...</option>
                        {services.map(s => <option key={s.id} value={s.id}>{s.name} ({s.price} грн)</option>)}
                    </select>
                </div>

                <div className="input">
                    <p>Дата</p>
                    <input type="date" name="startDate" value={visitData.startDate} onChange={handleChange} required />
                </div>

                <div className="input">
                    <p>Час</p>
                    <input type="time" name="startTime" value={visitData.startTime} onChange={handleChange} required />
                </div>

                <button type="submit" style={{ gridColumn: "span 2", marginTop: "15px" }}>Створити</button>
            </form>
        </div>
    );
};

export default CreateVisit;