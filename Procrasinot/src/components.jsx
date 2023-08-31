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
// NEEDS A FIX> DOESN"T WORK DONT FORGET FIX FIX FIX
export const Timer = (time) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    const TotalMinutes = 50; // Set the time in minutes
  
    const calcTime = (remainingTime) => {
      const remainingSeconds = Math.floor((remainingTime / 1000) % 60);
      const remainingMinutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const remainingHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    };
  
    useEffect(() => {
      const TimerInterval = setInterval(() => {
        const now = Date.now();
        const endTime = now + (TotalMinutes * 60 * 1000); // Calculate the end time in milliseconds
  
        if (now < endTime) {
          const remainingTime = endTime - now;
          calcTime(remainingTime);
        } else {
          clearInterval(TimerInterval);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        }
      }, 1000);
  
      return () => clearInterval(TimerInterval); // Cleanup of interval after unmounting
    }, [TotalMinutes]);
  
    return (
      <div className="timer">
           <h1>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
      </div>
    );
  };