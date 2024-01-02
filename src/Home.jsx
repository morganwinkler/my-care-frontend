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
      <div>
        <button onClick={handleShowVisitModal}>+ Visit</button>
        <AddVisitModal show={isVisitModalVisible} onClose={handleCloseVisitModal} onAddVisit={handleAddVisit} />
      </div>
      <h2>My Visits</h2>
      {props.visits && props.visits.length > 0 ? (
        props.visits.map((visit) => (
          <div key={visit.id}>
            <p>Reason for admission: {visit.reason}</p>
            <p>Hospital: {visit.hospital}</p>
            <p>Admission Date: {visit.start_date}</p>
            <button>
              <Link to={`visits/${visit.id}`}>More Info</Link>
            </button>
          </div>
        ))
      ) : (
        <p>You do not have any visits yet</p>
      )}
    </div>
  );
}
