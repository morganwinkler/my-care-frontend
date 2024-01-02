/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function AddMedModal(props) {
  const [medData, setMedData] = useState({
    name: "",
    reason: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMed = () => {
    props.onAddMed(medData.name, medData.reason, medData.note);
  };

  if (props.show) {
    return (
      <div className="modal-background container">
        <section className="modal-main">
          <div className="modal-content">
            <h2>Add New Medication</h2>
            <label>Name:</label>
            <input type="text" name="name" value={medData.name} onChange={handleChange} />
            <label>Reason for Rx:</label>
            <input type="text" name="reason" value={medData.reason} onChange={handleChange} />
            <label>Note:</label>
            <textarea name="note" value={medData.note} onChange={handleChange} />
            <button onClick={handleAddMed}>Add Medication</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </section>
      </div>
    );
  }
}
