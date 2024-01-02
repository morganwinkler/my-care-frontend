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
      <div className="modal-background container">
        <section className="modal-main">
          <div className="modal-content">
            <h2>Add New Question</h2>
            <label>Question:</label>
            <input type="text" name="question" value={questionData.name} onChange={handleChange} />
            <label>Answer:</label>
            <input type="text" name="answer" value={questionData.reason} onChange={handleChange} />
            <label>Note:</label>
            <textarea name="note" value={questionData.note} onChange={handleChange} />
            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </section>
      </div>
    );
  }
}
