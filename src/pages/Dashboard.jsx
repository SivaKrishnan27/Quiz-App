import React from 'react'
import { Link } from 'react-router-dom'
import { serverDetails } from '../assets/data/Data'
const Dashboard = () => {

    
  return (
    <div>Dashboard

        <h2>SERVER details</h2>
        <div className="server-container">
            {serverDetails.map(server => {
                return( <div key={server.lobbyId} className='server-card flex gap-1 mb-2'>
                    <div>
                        <h3>{server.serverTitle} - server ID: {server.lobbyId}</h3>
                        <p>{server.serverDescription}</p>
                    </div>
   936                 <Link to={`/quiz/${server.lobbyId}`} className='bg-green-900 rounded-[6px] px-4 py-2 text-blue-50'>Join</Link>
                </div>)
            })}
        </div>
    </div>
  )
}

export default Dashboard