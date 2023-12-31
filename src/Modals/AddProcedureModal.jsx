/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function AddProcedureModal(props) {
  const [procedureData, setProcedureData] = useState({
    name: "",
    date: "",
    reason: "",
    result: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProcedure = () => {
    props.onAddProcedure(
      procedureData.name,
      procedureData.date,
      procedureData.reason,
      procedureData.result,
      procedureData.note
    );
  };

  if (props.show) {
    return (
      <div className="modal-background container">
        <section className="modal-main">
          <div className="modal-content">
            <h2>Add New Procedure</h2>
            <label>Name:</label>
            <input type="text" name="name" value={procedureData.name} onChange={handleChange} />
            <label>Date:</label>
            <input type="date" name="date" value={procedureData.date} onChange={handleChange} />
            <label>Reason:</label>
            <input type="text" name="reason" value={procedureData.reason} onChange={handleChange} />
            <label>Result:</label>
            <input type="text" name="result" value={procedureData.result} onChange={handleChange} />
            <label>Note:</label>
            <textarea name="note" value={procedureData.note} onChange={handleChange} />
            <button onClick={handleAddProcedure}>Add Procedure</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </section>
      </div>
    );
  }
}
