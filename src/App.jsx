import React, { createContext, useState } from 'react'
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'

  const userContext = createContext()
const App = () => {

  const [email,SetEmail] = useState('')
  const [password,SetPassword]= useState('')


  return (
   <userContext.Provider value={{email,password}}>
   <Router>
    <Routes>
      <Route path='/' index exact element={ <Login password = {password} SetPassword ={SetPassword} email = {email} SetEmail={SetEmail} />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/quiz/:lobbyId'element={<Quiz/>} />
        <Route path='/quiz'element={<Quiz/>} />
    </Routes>
   </Router>
   </userContext.Provider>
  )
}

const Login = ({password, SetPassword, email, SetEmail}) =>{
  return(
    <div>
 
      <input className='bg-gray-700 border-2 border-blue-50 px-4 py-2 rounded-[6px]' type="email" name="email"  placeholder='Email Address' value={email}  onChange={(e)=> SetEmail(e.target.value)}/>
      <input className='bg-gray-700 border-2 border-blue-50 px-4 py-2 rounded-[6px]' type="password" name="password"  placeholder='Password' value={password} onChange={(e)=> SetPassword(e.target.value)}/>
      <button className='bg-green-700 px-4 py-2 rounded-[6px] text-blue-50'>Continue</button>
      <Link to={'/dashboard'}>Guest Account</Link>
    
    </div>
  )
}

export default App