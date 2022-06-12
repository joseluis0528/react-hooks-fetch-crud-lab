import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application.json'
      },
    })
    .then(response => response.json())
    .then(() => onDelete(question))
  }

  function handleUpdate(answer) {
    const correctAnswer = answer.target.value
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'Patch',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctAnswer: correctAnswer
      })
    })
    .then(response => response.json())
    .then(updatedQuestion => onUpdate(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
