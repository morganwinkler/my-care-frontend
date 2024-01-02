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
      <div className="modal-background">
        <section className="modal-box">
          <div className="modal-content flex flex-col">
            <h2 className="text-center text-xl font-bold">Add New Visit</h2>
            <label>Hospital:</label>
            <input
              type="text"
              name="hospital"
              value={visitData.hospital}
              onChange={handleChange}
              className="input input-bordered input-accent "
            />
            <label>Date of Admission:</label>
            <input
              type="date"
              name="start_date"
              value={visitData.start_date}
              onChange={handleChange}
              className="input input-bordered input-accent "
            />
            <label>Date of Discharge:</label>
            <input
              type="date"
              name="end_date"
              value={visitData.end_date}
              onChange={handleChange}
              className="input input-bordered input-accent "
            />
            <label>Reason for Admission:</label>
            <input
              type="text"
              name="reason"
              value={visitData.reason}
              onChange={handleChange}
              className="input input-bordered input-accent "
            />
            <div className="text-center" style={{ padding: "10px" }}>
              <button className="btn btn-outline btn-success" onClick={handleAddVisit} style={{ margin: "5px" }}>
                Add Visit
              </button>
              <button className="btn btn-outline btn-error" onClick={props.onClose}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
