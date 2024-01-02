/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function AddVisitModal(props) {
  const [visitData, setVisitData] = useState({
    hospital: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddVisit = () => {
    props.onAddVisit(visitData.hospital, visitData.start_date, visitData.end_date, visitData.reason);
  };

  if (props.show) {
    return (
      <div className="modal-background container">
        <section className="modal-main">
          <div className="modal-content">
            <h2>Add New Visit</h2>
            <label>Hospital:</label>
            <input type="text" name="hospital" value={visitData.hospital} onChange={handleChange} />
            <label>Date of Admission:</label>
            <input type="date" name="start_date" value={visitData.start_date} onChange={handleChange} />
            <label>Date of Discharge:</label>
            <input type="date" name="end_date" value={visitData.end_date} onChange={handleChange} />
            <label>Reason for Admission:</label>
            <input type="text" name="reason" value={visitData.reason} onChange={handleChange} />
            <button onClick={handleAddVisit}>Add Visit</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </section>
      </div>
    );
  }
}
