/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function AddNurseModal(props) {
  const [nurseData, setNurseData] = useState({
    name: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNurseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddNurse = () => {
    props.onAddNurse(nurseData.name, nurseData.date, nurseData.time, nurseData.note);
  };

  if (props.show) {
    return (
      <div className="modal-background container">
        <section className="modal-main">
          <div className="modal-content">
            <h2>Add New RN</h2>
            <label>Name:</label>
            <input type="text" name="name" value={nurseData.name} onChange={handleChange} />
            <label>Date:</label>
            <input type="date" name="date" value={nurseData.date} onChange={handleChange} />
            <label>AM/PM:</label>
            <input type="text" name="time" value={nurseData.time} onChange={handleChange} />
            <label>Note:</label>
            <textarea name="note" value={nurseData.note} onChange={handleChange} />
            <button onClick={handleAddNurse}>Add RN</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </section>
      </div>
    );
  }
}
