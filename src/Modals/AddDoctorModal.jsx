/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function AddDoctorModal(props) {
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialty: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDoctor = () => {
    props.onAddDoctor(doctorData.name, doctorData.specialty, doctorData.note);
  };

  if (props.show) {
    return (
      <div className="modal-background container">
        <section className="modal-main">
          <div className="modal-content">
            <h2>Add New Doctor</h2>
            <label>Name:</label>
            <input type="text" name="name" value={doctorData.name} onChange={handleChange} />
            <label>Specialty:</label>
            <input type="text" name="specialty" value={doctorData.specialty} onChange={handleChange} />
            <label>Note:</label>
            <textarea name="note" value={doctorData.note} onChange={handleChange} />
            <button onClick={handleAddDoctor}>Add Doctor</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </section>
      </div>
    );
  }
}
