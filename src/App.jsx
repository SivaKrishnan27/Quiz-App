import React, { createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import { usersDetails } from './assets/data/Data'

export const userContext = createContext()
const App = () => {
  const [uName, SetUName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')

  return (
    <userContext.Provider value={{ uName, email, password }}>
      <Router basename='/Quiz-App'>
        <Routes>
          <Route
            path='/'
            index
            exact
            element={
              <Login
                uName={uName}
                SetUName={SetUName}
                password={password}
                SetPassword={SetPassword}
                email={email}
                SetEmail={SetEmail}
              />
            }
          />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/quiz/:lobbyId' element={<Quiz />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </Router>
    </userContext.Provider>
  )
}

const Login = ({ uName, SetUName, password, SetPassword, email, SetEmail }) => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const foundUser = usersDetails.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password && user.uName === uName,
    )
    if (!foundUser) {
      setError('Invalid credentials. Please verify username, email, and password.')
      return
    }
    setError('')
    navigate('/dashboard')
  }

  return (
    <div className='Main'>
      <div className='container-login'>
        <form onSubmit={handleSubmit}>
          <input
            className='bg-gray-700 border-2 border-blue-50 px-4 py-2 rounded-[6px]'
            type='text'
            name='uName'
            placeholder='User Name'
            value={uName}
            onChange={(e) => SetUName(e.target.value)}
            style={{ margin: '20px' }}
          />
          <input
            className='bg-gray-700 border-2 border-blue-50 px-4 py-2 rounded-[6px]'
            type='email'
            name='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            style={{ margin: '20px' }}
          />
          <input
            className='bg-gray-700 border-2 border-blue-50 px-4 py-2 rounded-[6px]'
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            style={{ margin: '20px' }}
          />
          {error && <div style={{ color: 'red', margin: '0 20px' }}>{error}</div>}
          <button className='bg-green-700 px-4 py-2 rounded-[6px] text-blue-50' type='submit' style={{ margin: '20px' }}>
            Continue
          </button>
          <Link to={'/dashboard'} style={{ margin: '20px', color: 'white' }}>
            Guest__Account
          </Link>
        </form>
      </div>
    </div>
  )
}

export default App