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
      <div className="modal-background">
        <section className="modal-main">
          <div className="flex justify-center">
            <div className="prose">
              <div className="modal-content">
                <h2>Add New Procedure</h2>
                <div className="flex flex-col">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered input-accent"
                    value={procedureData.name}
                    onChange={handleChange}
                  />
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered input-accent"
                    value={procedureData.date}
                    onChange={handleChange}
                  />
                  <label>Reason:</label>
                  <input
                    type="text"
                    name="reason"
                    className="input input-bordered input-accent"
                    value={procedureData.reason}
                    onChange={handleChange}
                  />
                  <label>Result:</label>
                  <input
                    type="text"
                    name="result"
                    className="input input-bordered input-accent"
                    value={procedureData.result}
                    onChange={handleChange}
                  />
                  <label>Note:</label>
                  <textarea
                    name="note"
                    className="input input-bordered input-accent"
                    value={procedureData.note}
                    onChange={handleChange}
                  />
                  <div className="text-center" style={{ padding: "10px" }}>
                    <button
                      className="btn btn-outline btn-success"
                      style={{ margin: "5px" }}
                      onClick={handleAddProcedure}
                    >
                      Add Procedure
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
