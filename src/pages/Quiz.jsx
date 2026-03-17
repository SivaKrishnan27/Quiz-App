import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { lobbyDetails, Quiz as QuizData } from '../assets/data/Data'
import { userContext } from '../App'
import './Quiz.css'

const Quiz = () => {
  const { lobbyId } = useParams()
  const { uName: loggedInUser } = useContext(userContext)

  let lobbyIndex = lobbyDetails.findIndex(item => item.lobbyId == lobbyId)
  let lobby = lobbyDetails[lobbyIndex]
  let players = lobby.playersDetail

  const [category, setCategory] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [playerName, setPlayerName] = useState(loggedInUser || '')
  const [startQuiz, setStartQuiz] = useState(false)
  const [leaderboard, setLeaderboard] = useState([...players].sort((a, b) => b.points - a.points))

  const handleOptionChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    )
  }

  const handleSubmitAnswer = () => {
    const correctAnswers = QuizData[category][questionIndex].answers

    const isCorrect =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every(ans => correctAnswers.includes(ans))

    const newScore = isCorrect ? score + 4 : score - 2
    setScore(newScore)
    setSelectedOptions([])

    if (questionIndex < QuizData[category].length - 1) {
      setQuestionIndex(prev => prev + 1)
    } else {
      // Update the in-memory database (lobbyDetails)
      const existingIndex = players.findIndex(p => p.uName === playerName)
      if (existingIndex !== -1) {
        players[existingIndex].points = newScore
      } else {
        players.push({ uName: playerName, points: newScore })
      }

      // Refresh leaderboard state to reflect updated scores
      setLeaderboard([...players].sort((a, b) => b.points - a.points))

      alert('Quiz Finished! Your Score: ' + newScore)
      setStartQuiz(false)
      setCategory(null)
      setQuestionIndex(0)
      setScore(0)
    }
  }

  const currentUser = loggedInUser || playerName

  return (
    <div>
      <h2>Quiz</h2>
      <div>
        <h4>Lobby ID : {lobby.lobbyId}</h4>

        {!category && (
          <div className='Main'>
            <div className='category'>
              <div>
                <h3>Select Category</h3>
                {Object.keys(QuizData).map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)} className="bg-purple-700 text-white px-4 py-2 m-2">{cat}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {category && !startQuiz && (
          <div className='Main'>
            <div className='category'>
              <div>
                <h3>Selected Category: {category}</h3>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="border p-2 m-2"
                />
                <button onClick={() => setStartQuiz(true)} className="bg-purple-600 text-white px-4 py-2" disabled={!playerName}>
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {startQuiz && (
          <div className='Quiz'>
            <div className='container'>
              <h3>Category: {category}</h3>
              <h4>
                Question {questionIndex + 1}:{' '}
                {QuizData[category][questionIndex].question}
              </h4>
              <hr />
              {QuizData[category][questionIndex].options.map((option, index) => (
                <ul key={index}>
                  <li>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                    />
                    <label> {option}</label>
                  </li>
                </ul>
              ))}
              <button onClick={handleSubmitAnswer} className="bg-green-600 text-white px-4 py-2 mt-2">Submit</button>
              <h4>Current Score: {score}</h4>
            </div>
          </div>
        )}

        {/* Leaderboard / Score Card */}
        <div className='players-List'>
          <h3>🏆 Leaderboard</h3>
          {leaderboard.map((player, index) => {
            const isCurrentUser = player.uName === currentUser
            return (
              <div
                key={index}
                className={`leaderboard-row ${isCurrentUser ? 'current-user-row' : ''}`}
              >
                <span className='rank'>#{index + 1}</span>
                <span className='player-name'>
                  {player.uName}
                  {isCurrentUser && <span className='you-badge'>YOU</span>}
                </span>
                <span className='player-points'>{player.points} pts</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Quiz
