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
      <div className="modal-background">
        <section className="modal-main">
          <div className="flex justify-center">
            <div className="prose">
              <div className="modal-content">
                <h2>Add New Medication</h2>
                <div className="flex flex-col">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered input-accent"
                    value={medData.name}
                    onChange={handleChange}
                  />
                  <label>Reason for Rx:</label>
                  <input
                    type="text"
                    name="reason"
                    className="input input-bordered input-accent"
                    value={medData.reason}
                    onChange={handleChange}
                  />
                  <label>Note:</label>
                  <textarea
                    name="note"
                    className="input input-bordered input-accent"
                    value={medData.note}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center" style={{ padding: "10px" }}>
                  <button className="btn btn-outline btn-success" style={{ margin: "5px" }} onClick={handleAddMed}>
                    Add Medication
                  </button>
                  <button className="btn btn-outline btn-error" onClick={props.onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
