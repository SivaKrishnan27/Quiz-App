import React from 'react'
import { useParams } from 'react-router-dom'
import {lobbyDetails} from '../assets/data/Data'
const Quiz = () => {
    const {lobbyId} = useParams()
 console.log(lobbyDetails)
    
   let lobbyIndex = lobbyDetails.findIndex(item => item.lobbyId == lobbyId )
   let lobby = lobbyDetails[lobbyIndex];
   let players = lobby.playersDetail;

   let topPlayer =players.sort((a,b)=> b.points - a.points)
   console.log(topPlayer)
  return (
    <div>
        <h2>Quiz</h2>
        <div>
            
            <h4>Lobby ID : {lobby.lobbyId}</h4>
           <div className='players-List'>
            {
                topPlayer.map((player, index) =>{
                    return(
                        <div className='flex gap-2' key={index}>
                            <span>{player.email}</span>
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