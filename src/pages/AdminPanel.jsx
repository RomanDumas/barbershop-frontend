import { useState } from "react";
import Client from "../entities/Client";
import PaymentMethod from "../entities/PaymentMethod";
import Service from "../entities/Service";
import Qualification from "../entities/Qualification";
import Hairdresser from "../entities/Hairdresser";
import Visit from "../entities/Visit";
import Payment from "../entities/Payment";
import { useNavigate } from "react-router-dom";
import './AdminPanel.css';

function AdminPanel() {
  // За замовчуванням показуємо візити, бо це найважливіше
  const [activeTab, setActiveTab] = useState("visits");
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="title">
        <h1>Admin Panel</h1>
        {/* Швидкі дії */}
        <div className="quick-actions">
           <button onClick={() => navigate('/createVisit')}>+ Новий візит</button>
           <button onClick={() => navigate('/createClient')}>+ Новий клієнт</button>
        </div>
      </div>

      {/* Навігація по вкладках */}
      <div className="tab-menu">
        <button onClick={() => setActiveTab("visits")} className={activeTab === "visits" ? "active" : ""}>Візити</button>
        <button onClick={() => setActiveTab("clients")} className={activeTab === "clients" ? "active" : ""}>Клієнти</button>
        <button onClick={() => setActiveTab("hairdressers")} className={activeTab === "hairdressers" ? "active" : ""}>Майстри</button>
        <button onClick={() => setActiveTab("services")} className={activeTab === "services" ? "active" : ""}>Послуги</button>
        <button onClick={() => setActiveTab("payments")} className={activeTab === "payments" ? "active" : ""}>Платежі</button>
        <button onClick={() => setActiveTab("qualifications")} className={activeTab === "qualifications" ? "active" : ""}>Кваліфікації</button>
        <button onClick={() => setActiveTab("paymentMethods")} className={activeTab === "paymentMethods" ? "active" : ""}>Методи оплати</button>
      </div>

      {/* Робоча область - рендериться ТІЛЬКИ той компонент, який вибрано */}
      <div className="workspace">
        {activeTab === "visits" && <Visit />}
        {activeTab === "clients" && <Client />}
        {activeTab === "hairdressers" && <Hairdresser />}
        {activeTab === "services" && <Service />}
        {activeTab === "payments" && <Payment />}
        {activeTab === "qualifications" && <Qualification />}
        {activeTab === "paymentMethods" && <PaymentMethod />}
      </div>
    </div>
  );
}

export default AdminPanel;