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
      <div className="modal-background">
        <section className="modal-main">
          <div className="flex justify-center">
            <div className="prose">
              <div className="modal-content">
                <h2>Add New RN</h2>
                <div className="flex flex-col">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered input-accent"
                    value={nurseData.name}
                    onChange={handleChange}
                  />
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered input-accent"
                    value={nurseData.date}
                    onChange={handleChange}
                  />
                  <label>AM/PM:</label>
                  <input
                    type="text"
                    name="time"
                    className="input input-bordered input-accent"
                    value={nurseData.time}
                    onChange={handleChange}
                  />
                  <label>Note:</label>
                  <textarea
                    name="note"
                    className="input input-bordered input-accent"
                    value={nurseData.note}
                    onChange={handleChange}
                  />
                  <div className="text-center" style={{ padding: "10px" }}>
                    <button className="btn btn-outline btn-success" style={{ margin: "5px" }} onClick={handleAddNurse}>
                      Add RN
                    </button>
                    <button className="btn btn-outline btn-error" onClick={props.onClose}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
