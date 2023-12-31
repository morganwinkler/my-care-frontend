import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddDoctorModal } from "./Modals/AddDoctorModal";

export function VisitShow() {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }
  const { visit_id } = useParams();
  const [thisVisit, setThisVisit] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddDoctor = (name, specialty, note) => {
    const params = {
      visit_id,
      name,
      specialty,
      note,
    };
    axios
      .post("http://localhost:3000/doctors.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/visits/${visit_id}.json`).then((response) => {
      setThisVisit(response.data);
    });
  }, [visit_id]);
  return (
    <div>
      <div>
        <h2>Hospital: {thisVisit.hospital}</h2>
        <h2>Reason for Admission: {thisVisit.reason}</h2>
      </div>
      <div>
        <h3>Admission Date: {thisVisit.start_date}</h3>
        <h3>Discharge Date: {thisVisit.end_date}</h3>
      </div>
      <div>
        <h2>My Doctors:</h2>
        {thisVisit.doctors && thisVisit.doctors.length > 0 ? (
          thisVisit.doctors.map((doctor) => (
            <div key={doctor.id}>
              <p>Dr: {doctor.name}</p>
              <p>Specialty: {doctor.specialty}</p>
              <p>Note: {doctor.note}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any doctors added yet</p>
        )}
        <button onClick={handleShowModal}>+ Doctor</button>
        <AddDoctorModal show={isModalVisible} onClose={handleCloseModal} onAddDoctor={handleAddDoctor} />
      </div>
      <div>
        <h2>My RNs:</h2>
        {thisVisit.nurses && thisVisit.nurses.length > 0 ? (
          thisVisit.nurses.map((nurse) => (
            <div key={nurse.id}>
              <p>{nurse.name}</p>
              <p>{nurse.date}</p>
              <p>{nurse.time}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any nurses added yet</p>
        )}
      </div>
      <div>
        <h2>My Meds:</h2>
        {thisVisit.medications && thisVisit.medications.length > 0 ? (
          thisVisit.medications.map((medication) => (
            <div key={medication.id}>
              <p>{medication.name}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any medications added yet</p>
        )}
      </div>
      <div>
        <h2>My Procedures:</h2>
        {thisVisit.procedures && thisVisit.procedures.length > 0 ? (
          thisVisit.procedures.map((procedure) => (
            <div key={procedure.id}>
              <p>{procedure.name}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any procedures added yet</p>
        )}
      </div>
      <div>
        <h2>My Questions:</h2>
        {thisVisit.questions && thisVisit.questions.length > 0 ? (
          thisVisit.questions.map((question) => (
            <div key={question.id}>
              <p>{question.question}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any procedures added yet</p>
        )}
      </div>
    </div>
  );
}
