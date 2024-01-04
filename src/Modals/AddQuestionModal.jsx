/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function AddQuestionModal(props) {
  const [questionData, setQuestionData] = useState({
    question: "",
    answer: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddQuestion = () => {
    props.onAddQuestion(questionData.question, questionData.answer, questionData.note);
  };

  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          <div className="flex justify-center">
            <div className="prose">
              <div className="modal-content">
                <h2>Add New Question</h2>
                <div className="flex flex-col">
                  <label>Question:</label>
                  <input
                    type="text"
                    name="question"
                    className="input input-bordered input-accent"
                    value={questionData.name}
                    onChange={handleChange}
                  />
                  <label>Answer:</label>
                  <input
                    type="text"
                    name="answer"
                    className="input input-bordered input-accent"
                    value={questionData.reason}
                    onChange={handleChange}
                  />
                  <label>Note:</label>
                  <textarea
                    name="note"
                    className="input input-bordered input-accent"
                    value={questionData.note}
                    onChange={handleChange}
                  />
                  <div className="text-center" style={{ padding: "10px" }}>
                    <button
                      className="btn btn-outline btn-success"
                      style={{ margin: "5px" }}
                      onClick={handleAddQuestion}
                    >
                      Add Question
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
