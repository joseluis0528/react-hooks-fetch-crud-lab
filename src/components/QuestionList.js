import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])
  
  const allQuestions = questions.map((question) => {
    return <QuestionItem 
    key={question.id}
    question={question}
    onDelete={handleDelete} 
    onUpdate={handleUpdate}
    />
  })

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(data => setQuestions(data))
  }, [setQuestions])

  function handleDelete(deleteQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deleteQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleUpdate(updatedQuestion) {
    const updatedQuestions = questions.map( question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion
      }
      else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
