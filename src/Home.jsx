/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AddVisitModal } from "./Modals/AddVisitModal";

export function Home(props) {
  const [isVisitModalVisible, setIsVisitModalVisible] = useState(false);

  const handleShowVisitModal = () => {
    setIsVisitModalVisible(true);
  };

  const handleCloseVisitModal = () => {
    setIsVisitModalVisible(false);
  };

  const handleAddVisit = (hospital, start_date, end_date, reason) => {
    const params = {
      hospital,
      start_date,
      end_date,
      reason,
    };
    axios
      .post("http://localhost:3000/visits.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="flex flex-row-reverse">
        <button onClick={handleShowVisitModal} className="btn btn-accent" style={{ margin: "15px" }}>
          + Visit
        </button>
        <AddVisitModal show={isVisitModalVisible} onClose={handleCloseVisitModal} onAddVisit={handleAddVisit} />
      </div>
      <div className="grid-flow-row">
        <h2 className="text-center text-3xl underline font-bold" style={{ paddingBottom: "50px" }}>
          My Visits
        </h2>
        {props.visits && props.visits.length > 0 ? (
          props.visits.map((visit) => (
            <div
              key={visit.id}
              className="card shadow-2xl"
              style={{ padding: "30px", marginBottom: "50px", marginLeft: "250px", marginRight: "250px" }}
            >
              <div className="grid grid-cols-3 text-center" style={{ paddingBottom: "30px" }}>
                <p>Reason for admission: {visit.reason}</p>
                <p>Hospital: {visit.hospital}</p>
                <p>Admission Date: {visit.start_date}</p>
              </div>
              <div className="text-center">
                <button className="btn btn-accent" style={{ maxWidth: "100px" }}>
                  <Link to={`visits/${visit.id}`}>More Info</Link>
                </button>
              </div>
              <div></div>
            </div>
          ))
        ) : (
          <p>You do not have any visits yet</p>
        )}
      </div>
    </div>
  );
}
