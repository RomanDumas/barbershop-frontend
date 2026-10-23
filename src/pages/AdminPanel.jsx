import Client from "../entities/Client";
import './AdminPanel.css'
import PaymentMethod from "../entities/PaymentMethod";
import Service from "../entities/Service"
import Qualification from "../entities/Qualification"
import Hairdresser from "../entities/Hairdresser";
import Visit from "../entities/Visit";
import Payment from "../entities/Payment";

function AdminPanel() {
  return (
    <>
    <title>Admin panel</title>

      <div className="title">
        <h1>Admin panel</h1>
      </div>


      <div className="list-container">

        <div className="list">
            <Client />
        </div>

        <div className="list">
          <PaymentMethod />
        </div>

        <div className="list">
          <Service />
        </div>

        <div className="list">
          <Qualification />
        </div>

        <div className="list">
          <Hairdresser />
        </div>

        <div className="list">
          <Visit />
        </div>

        <div className="list">
          <Payment />
        </div>
      </div>

      
    </>
  )
}

export default AdminPanel
