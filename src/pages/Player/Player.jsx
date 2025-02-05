import React, { useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} =useParams();
  const navigate= useNavigate();
  const [apiData, setApiDate]= useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmZjYmNmN2Q4YjA3YTc5NjU5ZWY2MWM3NmFhNTYyNiIsIm5iZiI6MTczODcyODkwMi4xNzcsInN1YiI6IjY3YTJlNWM2N2M4NjA5NjAyOThhNmM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4sa7AG-vgrbAxKf5C_TBdfe3cmUmJViIW6jGQZXKKGw'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiDate(res.results[0]))
    .catch(err => console.error(err));
  },[])

  

  return (
      <div className="player">
        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
        <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='treiler' frameBorder='0' allowFullScreen> </iframe>
        
        <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      
      </div>
  )
}

export default Player
