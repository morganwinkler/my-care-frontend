import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddDoctorModal } from "./Modals/AddDoctorModal";
import { AddNurseModal } from "./Modals/AddNurseModal";
import { AddMedModal } from "./Modals/AddMedModal";
import { AddProcedureModal } from "./Modals/AddProcedureModal";
import { AddQuestionModal } from "./Modals/AddQuestionModal";

export function VisitShow() {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }
  const { visit_id } = useParams();
  const [thisVisit, setThisVisit] = useState({});
  const [isDoctorModalVisible, setIsDoctorModalVisible] = useState(false);
  const [isNurseModalVisible, setIsNurseModalVisible] = useState(false);
  const [isMedModalVisible, setIsMedModalVisible] = useState(false);
  const [isProcedureModalVisible, setIsProcedureModalVisible] = useState(false);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);

  const handleShowDoctorModal = () => {
    setIsDoctorModalVisible(true);
  };

  const handleCloseDoctorModal = () => {
    setIsDoctorModalVisible(false);
  };
  const handleShowNurseModal = () => {
    setIsNurseModalVisible(true);
  };

  const handleCloseNurseModal = () => {
    setIsNurseModalVisible(false);
  };
  const handleShowMedModal = () => {
    setIsMedModalVisible(true);
  };

  const handleCloseMedModal = () => {
    setIsMedModalVisible(false);
  };
  const handleShowProcedureModal = () => {
    setIsProcedureModalVisible(true);
  };

  const handleCloseProcedureModal = () => {
    setIsProcedureModalVisible(false);
  };
  const handleShowQuestionModal = () => {
    setIsQuestionModalVisible(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalVisible(false);
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

  const handleDeleteDoctor = (id) => {
    axios.delete(`http://localhost:3000/doctors/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };
  const handleAddNurse = (name, date, time, note) => {
    const params = {
      visit_id,
      name,
      date,
      time,
      note,
    };
    axios
      .post("http://localhost:3000/nurses.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteNurse = (id) => {
    axios.delete(`http://localhost:3000/nurses/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };
  const handleAddMed = (name, reason, note) => {
    const params = {
      visit_id,
      name,
      reason,
      note,
    };
    axios
      .post("http://localhost:3000/medications.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteMed = (id) => {
    axios.delete(`http://localhost:3000/medications/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };

  const handleAddProcedure = (name, date, reason, result, note) => {
    const params = {
      visit_id,
      name,
      date,
      reason,
      result,
      note,
    };
    axios
      .post("http://localhost:3000/procedures.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProcedure = (id) => {
    axios.delete(`http://localhost:3000/procedures/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };
  const handleAddQuestion = (question, answer, note) => {
    const params = {
      visit_id,
      question,
      answer,
      note,
    };
    axios
      .post("http://localhost:3000/questions.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`http://localhost:3000/questions/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.reload();
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
              <button onClick={() => handleDeleteDoctor(doctor.id)}>X</button>
              <p>Dr: {doctor.name}</p>
              <p>Specialty: {doctor.specialty}</p>
              <p>Note: {doctor.note}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any doctors added yet</p>
        )}
        <button onClick={handleShowDoctorModal}>+ Doctor</button>
        <AddDoctorModal show={isDoctorModalVisible} onClose={handleCloseDoctorModal} onAddDoctor={handleAddDoctor} />
      </div>
      <div>
        <h2>My RNs:</h2>
        {thisVisit.nurses && thisVisit.nurses.length > 0 ? (
          thisVisit.nurses.map((nurse) => (
            <div key={nurse.id}>
              <button onClick={() => handleDeleteNurse(nurse.id)}>X</button>
              <p>{nurse.name}</p>
              <p>{nurse.date}</p>
              <p>{nurse.time}</p>
              <p>{nurse.note}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any nurses added yet</p>
        )}
        <button onClick={handleShowNurseModal}>+ RN</button>
        <AddNurseModal show={isNurseModalVisible} onClose={handleCloseNurseModal} onAddNurse={handleAddNurse} />
      </div>
      <div>
        <h2>My Meds:</h2>
        {thisVisit.medications && thisVisit.medications.length > 0 ? (
          thisVisit.medications.map((medication) => (
            <div key={medication.id}>
              <button onClick={() => handleDeleteMed(medication.id)}>X</button>
              <p>{medication.name}</p>
              <p>{medication.reason}</p>
              <p>{medication.note}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any medications added yet</p>
        )}
        <button onClick={handleShowMedModal}>+ Medication</button>
        <AddMedModal show={isMedModalVisible} onClose={handleCloseMedModal} onAddMed={handleAddMed} />
      </div>
      <div>
        <h2>My Procedures:</h2>
        {thisVisit.procedures && thisVisit.procedures.length > 0 ? (
          thisVisit.procedures.map((procedure) => (
            <div key={procedure.id}>
              <button onClick={() => handleDeleteProcedure(procedure.id)}>X</button>
              <p>Procedure: {procedure.name}</p>
              <p>Checking: {procedure.reason}</p>
              <p>Date: {procedure.date}</p>
              <p>Result: {procedure.result}</p>
              <p>Note: {procedure.note}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any procedures added yet</p>
        )}
        <button onClick={handleShowProcedureModal}>+ Procedure</button>
        <AddProcedureModal
          show={isProcedureModalVisible}
          onClose={handleCloseProcedureModal}
          onAddProcedure={handleAddProcedure}
        />
      </div>
      <div>
        <h2>My Questions:</h2>
        {thisVisit.questions && thisVisit.questions.length > 0 ? (
          thisVisit.questions.map((question) => (
            <div key={question.id}>
              <button onClick={() => handleDeleteQuestion(question.id)}>X</button>
              <p>Question: {question.question}</p>
              <p>Answer: {question.answer}</p>
              <p>Note: {question.note}</p>
            </div>
          ))
        ) : (
          <p>You don&#39;t have any questions added yet</p>
        )}
        <button onClick={handleShowQuestionModal}>+ Question</button>
        <AddQuestionModal
          show={isQuestionModalVisible}
          onClose={handleCloseQuestionModal}
          onAddQuestion={handleAddQuestion}
        />
      </div>
    </div>
  );
}
