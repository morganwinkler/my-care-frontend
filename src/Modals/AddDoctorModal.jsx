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
      <div className="modal-background">
        <section className="modal-box">
          <div className="modal-content">
            <div className="prose">
              <div>
                <h2>Add New Doctor</h2>
              </div>
              <div className="flex flex-col">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered input-accent"
                  value={doctorData.name}
                  onChange={handleChange}
                />
                <label>Specialty:</label>
                <input
                  type="text"
                  name="specialty"
                  className="input input-bordered input-accent"
                  value={doctorData.specialty}
                  onChange={handleChange}
                />
                <label>Note:</label>
                <textarea
                  name="note"
                  className="input input-bordered input-accent"
                  value={doctorData.note}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center" style={{ padding: "10px" }}>
                <button className="btn btn-outline btn-success" style={{ margin: "5px" }} onClick={handleAddDoctor}>
                  Add Doctor
                </button>
                <button className="btn btn-outline btn-error" onClick={props.onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
