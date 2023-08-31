import './App.css'
import React, { useState, useEffect } from 'react';

export default function TimerChoice({name, goal, time}) {
    return (
        <div className="border border-primary">
            <h4>{name}</h4>
            <blockquote>{goal}</blockquote>
            <p>TIME: {time}</p>
        </div>
    )
}

export const TimerCountDown = ({ targetTimeInSeconds }) => {
    const [remainingTime, setRemainingTime] = useState(targetTimeInSeconds);
    const [isPaused, setIsPaused] = useState(false);
  
    const calcTime = (remainingTimeInSeconds) => {
      const hours = Math.floor(remainingTimeInSeconds / 3600);
      const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
      const seconds = remainingTimeInSeconds % 60;
  
      return { hours, minutes, seconds };
    };
  
    useEffect(() => {
      let timerInterval;
  
      {/*if (remainingTime > 0) {
        timerInterval = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
      }
  
      return () => {
        clearInterval(timerInterval);
      };
    }, [remainingTime]);*/}

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

    return (
      <div className="timer">
        <h1>
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </h1>
        <button onClick={togglePause}>{isPaused ? 'Unpause' : 'Pause'}</button>
      </div>
    );
  };
  