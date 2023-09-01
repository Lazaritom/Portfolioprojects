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
export const TimerCountDown = ({ targetTimeInSeconds }) => {
    const [remainingTime, setRemainingTime] = useState(targetTimeInSeconds);
    const [isPaused, setIsPaused] = useState(true); //makes sure that timer doesn't start untill user unpauses the timer.
  
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
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime, isPaused]);
  
    const { hours, minutes, seconds } = calcTime(remainingTime);
  
    const togglePause = () => {
      setIsPaused((prevIsPaused) => !prevIsPaused);
    };

    let control = '';
    if (isPaused && (remainingTime == targetTimeInSeconds)) {
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
        <button onClick={togglePause}>{control}</button> {/*add an option later that makes button read "start" */}
      </div>
    );
  };