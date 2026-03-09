import React, { createContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import {lobbyDetails,Quiz  as QuizData } from '../assets/data/Data'
import './Quiz.css'
const Quiz = () => {
    const {lobbyId} = useParams()
 console.log(lobbyDetails)
    
   let lobbyIndex = lobbyDetails.findIndex(item => item.lobbyId == lobbyId )
   let lobby = lobbyDetails[lobbyIndex];
   let players = lobby.playersDetail;

  const [category, setCategory] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [startQuiz, setStartQuiz] = useState(false)

   let topPlayer =players.sort((a,b)=> b.points - a.points)
   console.log(topPlayer)
   const handleOptionChange = (option) => {
    setSelectedOptions(prev => prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    )
  }

  const handleSubmitAnswer = () => {
    const correctAnswers = QuizData[category][questionIndex].answers

    const isCorrect =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every(ans => correctAnswers.includes(ans))

    if (isCorrect) {
      setScore(prev => prev + 4)
    } else {
      setScore(prev => prev - 2)
    }

    setSelectedOptions([])

    if (questionIndex < QuizData[category].length - 1) {
        setQuestionIndex(prev => prev + 1)
    }
    else {
      alert("Quiz Finished! Your Score: " + score)

      players.push({ uName: playerName, points: score })

      setStartQuiz(false)
      setCategory(null)
      setQuestionIndex(0)
      setScore(0)
    }
  }

  return (
    <div>
        <h2>Quiz</h2>
        <div>
            <h4>Lobby ID : {lobby.lobbyId}</h4>
            {!category && (
                <div>
                <h3>Select Category</h3>
                {Object.keys(QuizData).map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)} className="bg-blue-500 text-white px-4 py-2 m-2" > {cat} </button>
                ))}
                </div>
            )}

            {category && !startQuiz && (
                <div>
                <h3>Selected Category: {category}</h3>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="border p-2 m-2"
                />

                <button
                    onClick={() => setStartQuiz(true)}
                    className="bg-green-600 text-white px-4 py-2"
                    disabled={!playerName}
                >
                    Start Quiz
                </button>
                </div>
            )}

            {startQuiz  && (
                <div>
                <h3>Category: {category}</h3>
                <h4>
                    Question {questionIndex + 1}:{" "}
                    {QuizData[category][questionIndex].question}
                </h4>
                <hr/>

                {QuizData[category][questionIndex].options.map((option, index) => (
                    <li key={index}>
                    <input type="checkbox" value={option} checked={selectedOptions.includes(option)} onChange={() => handleOptionChange(option)} />
                    <label>{option}</label>
                    </li>
                ))}

                <button onClick={handleSubmitAnswer} className="bg-green-600 text-white px-4 py-2 mt-2" > Submit </button>

                <h4>Current Score: {score}</h4>
                </div>
            )}
            <div className='players-List'>
                {
                    topPlayer.map((player, index) =>{
                        return(
                            <div className='flex gap-2' key={index}>
                                <span>{player.uName}</span>
                                <h3>{player.points}</h3>
                            </div>
                        )
                    })
                }
           </div>
        </div>
    </div>
  )
}

export default Quiz