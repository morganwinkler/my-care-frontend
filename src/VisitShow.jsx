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
  const [isEditVisit, setIsEditVisit] = useState(false);
  const [editedVisit, setEditedVisit] = useState({
    hospital: thisVisit.hospital,
    reason: thisVisit.reason,
    start_date: thisVisit.start_date,
    end_date: "",
  });
  const [editQuestionModes, setEditQuestionModes] = useState({});
  const [editedQuestions, setEditedQuestions] = useState({});

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
  const handleDeleteVisit = (id) => {
    axios.delete(`http://localhost:3000/visits/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.href = "/";
    });
  };

  const handleEditVisitField = (field, value) => {
    setEditedVisit((prevVisit) => ({
      ...prevVisit,
      [field]: value,
    }));
  };

  const handleUpdateVisit = (id) => {
    const params = {
      visit_id,
      ...editedVisit,
    };

    axios
      .patch(`http://localhost:3000/visits/${id}.json`, params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const toggleEditQuestion = (questionId) => {
    setEditQuestionModes((prevEditQuestionModes) => ({
      ...prevEditQuestionModes,
      [questionId]: !prevEditQuestionModes[questionId],
    }));
  };

  const handleEditQuestionField = (questionId, field, value) => {
    setEditedQuestions((prevEditedQuestions) => ({
      ...prevEditedQuestions,
      [questionId]: {
        ...prevEditedQuestions[questionId],
        [field]: value,
      },
    }));
  };

  const handleUpdateQuestion = (questionId) => {
    const params = {
      ...editedQuestions[questionId],
    };

    axios
      .patch(`http://localhost:3000/questions/${questionId}.json`, params)
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
    <div className="text-center">
      <div className="card shadow-2xl" style={{ margin: "50px", padding: "50px" }}>
        <button onClick={() => setIsEditVisit(!isEditVisit)}>{isEditVisit ? "Cancel Edit" : "?"}</button>
        {isEditVisit ? (
          <div key={thisVisit.id}>
            <label> Date of Discharge: </label>
            <input
              type="date"
              value={editedVisit.end_date}
              onChange={(e) => handleEditVisitField("end_date", e.target.value)}
            />

            <button onClick={() => handleUpdateVisit(thisVisit.id)}>Save</button>
          </div>
        ) : (
          <div>
            <h2>Hospital: {thisVisit.hospital}</h2>
            <h2>Reason for Admission: {thisVisit.reason}</h2>
            <h3>Admission Date: {thisVisit.start_date}</h3>
            <h3>Discharge Date: {thisVisit.end_date}</h3>
          </div>
        )}
      </div>
      <div className="card shadow-2xl" style={{ margin: "50px" }}>
        <h2>My Doctors:</h2>
        <div className="flex justify-center ">
          {thisVisit.doctors && thisVisit.doctors.length > 0 ? (
            thisVisit.doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="card shadow shadow-cyan-500/50"
                style={{ margin: "10px", padding: "20px" }}
              >
                <button onClick={() => handleDeleteDoctor(doctor.id)}>X</button>
                <p>Dr: {doctor.name}</p>
                <p>Specialty: {doctor.specialty}</p>
                <p>Note: {doctor.note}</p>
              </div>
            ))
          ) : (
            <p>You don&#39;t have any doctors added yet</p>
          )}
        </div>
        <button onClick={handleShowDoctorModal}>+ Doctor</button>
        <AddDoctorModal show={isDoctorModalVisible} onClose={handleCloseDoctorModal} onAddDoctor={handleAddDoctor} />
      </div>
      <div className="card shadow-2xl" style={{ margin: "50px" }}>
        <h2>My RNs:</h2>
        <div className="flex justify-center">
          {thisVisit.nurses && thisVisit.nurses.length > 0 ? (
            thisVisit.nurses.map((nurse) => (
              <div
                key={nurse.id}
                className="card shadow shadow-cyan-500/50"
                style={{ margin: "10px", padding: "20px" }}
              >
                <button onClick={() => handleDeleteNurse(nurse.id)}>X</button>
                <p>Name: {nurse.name}</p>
                <p>Date: {nurse.date}</p>
                <p>Shift: {nurse.time}</p>
                <p>Note: {nurse.note}</p>
              </div>
            ))
          ) : (
            <p>You don&#39;t have any nurses added yet</p>
          )}
        </div>
        <button onClick={handleShowNurseModal}>+ RN</button>
        <AddNurseModal show={isNurseModalVisible} onClose={handleCloseNurseModal} onAddNurse={handleAddNurse} />
      </div>
      <div className="card shadow-2xl" style={{ margin: "50px" }}>
        <h2>My Meds:</h2>
        <div className="flex justify-center">
          {thisVisit.medications && thisVisit.medications.length > 0 ? (
            thisVisit.medications.map((medication) => (
              <div
                key={medication.id}
                className="card shadow shadow-cyan-500/50"
                style={{ margin: "10px", padding: "20px" }}
              >
                <button onClick={() => handleDeleteMed(medication.id)}>X</button>
                <p>Medication: {medication.name}</p>
                <p>Reason for Rx: {medication.reason}</p>
                <p>Note: {medication.note}</p>
              </div>
            ))
          ) : (
            <p>You don&#39;t have any medications added yet</p>
          )}
        </div>
        <button onClick={handleShowMedModal}>+ Medication</button>
        <AddMedModal show={isMedModalVisible} onClose={handleCloseMedModal} onAddMed={handleAddMed} />
      </div>
      <div className="card shadow-2xl" style={{ margin: "50px" }}>
        <h2>My Procedures:</h2>
        <div className="flex justify-center">
          {thisVisit.procedures && thisVisit.procedures.length > 0 ? (
            thisVisit.procedures.map((procedure) => (
              <div
                key={procedure.id}
                className="card shadow shadow-cyan-500/50"
                style={{ margin: "10px", padding: "20px" }}
              >
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
        </div>
        <button onClick={handleShowProcedureModal}>+ Procedure</button>
        <AddProcedureModal
          show={isProcedureModalVisible}
          onClose={handleCloseProcedureModal}
          onAddProcedure={handleAddProcedure}
        />
      </div>
      <div className="card shadow-2xl" style={{ margin: "50px" }}>
        <h2>My Questions:</h2>
        <div>
          <div className="flex justify-center">
            {thisVisit.questions && thisVisit.questions.length > 0 ? (
              thisVisit.questions.map((question) => (
                <div
                  key={question.id}
                  className="card shadow shadow-cyan-500/50"
                  style={{ margin: "10px", padding: "20px" }}
                >
                  <div className="flex flex-row justify-between">
                    <button onClick={() => toggleEditQuestion(question.id)}>
                      {editQuestionModes[question.id] ? "Cancel Edit" : "?"}
                    </button>
                    <button onClick={() => handleDeleteQuestion(question.id)}>X</button>
                  </div>
                  {editQuestionModes[question.id] ? (
                    <>
                      <label> Answer: </label>
                      <input
                        type="text"
                        value={editedQuestions[question.id]?.answer || ""}
                        onChange={(e) => handleEditQuestionField(question.id, "answer", e.target.value)}
                      />
                      <label> Note: </label>
                      <input
                        type="text"
                        value={editedQuestions[question.id]?.note || ""}
                        onChange={(e) => handleEditQuestionField(question.id, "note", e.target.value)}
                      />
                      <button onClick={() => handleUpdateQuestion(question.id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <div key={question.id} style={{ margin: "10px", padding: "20px" }}>
                        <p>Question: {question.question}</p>
                        <p>Answer: {question.answer}</p>
                        <p>Note: {question.note}</p>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>You don&#39;t have any questions added yet</p>
            )}
          </div>
          <button onClick={handleShowQuestionModal}>+ Question</button>
          <AddQuestionModal
            show={isQuestionModalVisible}
            onClose={handleCloseQuestionModal}
            onAddQuestion={handleAddQuestion}
          />
        </div>
        <button onClick={() => handleDeleteVisit(thisVisit.id)}>Delete This Visit</button>
      </div>
    </div>
  );
}
