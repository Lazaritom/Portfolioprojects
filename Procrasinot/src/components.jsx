import './App.css'
import React, { useState, useEffect } from 'react';

//FIRST DIV in APP
export default function TimerChoice({ object }) {
    return (
        <div className="border border-primary">
            <h4>{object.name}</h4>
            <blockquote>{object.goal}</blockquote>
            <p>TIME: {object.time[0]}</p>
        </div>
    )
}

//SECOND DIV IN APP
export const TimerCountDown = ({ targetArray }) => {
    const [remainingTime, setRemainingTime] = useState(targetArray[0]*60);
    const [isPaused, setIsPaused] = useState(true); //makes sure that timer doesn't start untill user unpauses the timer.
    const [currentIndex, setCurrentIndex] = useState(0)
  
    const calcTime = (remainingTimeInSeconds) => {
      const hours = Math.floor(remainingTimeInSeconds / 3600);
      const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
      const seconds = remainingTimeInSeconds % 60;
  
      return { hours, minutes, seconds };
    };
  
    useEffect(() => {
      let timerInterval;
 
    if (!isPaused && remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (currentIndex < targetArray.length - 1) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
              return targetArray[currentIndex + 1] * 60;
          } else {
            clearInterval(timerInterval);
            return 0;
          }
        }
      });
     }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime, isPaused, currentIndex, targetArray]);
  
    const { hours, minutes, seconds } = calcTime(remainingTime);
  
    const togglePause = () => {
      setIsPaused((prevIsPaused) => !prevIsPaused);
    };

    let control = '';
    if (isPaused && (remainingTime == targetArray[0]*60)) {
      control = "Start";
    } else if (isPaused) {
      control = "Unpause";
    } else {
      control = "Pause";
    }
    return (
      <div className="timer"> 
        <h1>
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </h1> 
        <button onClick={togglePause}>{control}</button> 
      </div>
    );
  }

  //form for personal procrasinotor
  export const UserTimer = () => {
    const [userName, setUserName] = useState("");
    const [userDes, setUserDes] = useState("");
    const [userTInput, setUserTInput] = useState('');
    const [userTimes, setUserTimes] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const nArray = userTInput.split(",").map((item) => item.trim());
      const validArray = nArray.filter((item) => !isNaN(item)).map((item) => Number(item));
      setUserTimes(validArray);
      setFormSubmitted(true);
    }
  
    return (
      <div className="border border-primary">
        {!formSubmitted ? (
          <form onSubmit={handleSubmit}>
            <label>Fill out the Procrasinotor</label>
            <input
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='Enter name of Procrasinotor'
            />
            <label htmlFor='userDes'>Description/Goal</label>
            <textarea
              id='userDes'
              placeholder="Enter the description or goal for this Procrasinotor"
              value={userDes}
              onChange={(e) => setUserDes(e.target.value)}
            />
            <label htmlFor='userTimes'>Enter your desired (work and break) times (in minutes) separated by a comma</label>
            <input
              type='text'
              id='userTimes'
              value={userTInput}
              onChange={(e) => setUserTInput(e.target.value)}
              placeholder='30,5,30,5'
            />
            <button type='submit'>Start Procrasinotor</button>
          </form>
        ) : (
          <div>
            <h4>Name: {userName}</h4>
            <blockquote>{userDes}</blockquote>
            <p>TIMES: {userTimes.join(', ')}</p>
          </div>
        )}
      </div>
    );
  }
  