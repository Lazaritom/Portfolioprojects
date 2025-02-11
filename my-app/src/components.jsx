import './App.css'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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

TimerChoice.propTypes = {
    object: PropTypes.shape({
        name: PropTypes.string.isRequired,
        goal: PropTypes.string.isRequired,
        time: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired
};

//SECOND DIV IN APP
export const TimerCountDown = ({ targetArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(targetArray[0] * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  const calcTime = (remainingTimeInSeconds) => {
    const hours = Math.floor(remainingTimeInSeconds / 3600);
    const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
    const seconds = remainingTimeInSeconds % 60;
    return { hours, minutes, seconds };
  };

  useEffect(() => {
    let timerInterval;

    if (!isPaused) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setOpenPopup(true);
            if (currentIndex < targetArray.length - 1) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
              setIsPaused(true);
              return targetArray[currentIndex + 1] * 60;
            } else {
              clearInterval(timerInterval);
              setIsPaused(true); // Pause the timer when it reaches the end
              return 0;
            }
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isPaused, currentIndex, targetArray]);

  const { hours, minutes, seconds } = calcTime(remainingTime);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  let control = '';
  if (isPaused && remainingTime === targetArray[currentIndex] * 60) {
    control = "Start";
  } else if (isPaused) {
    control = "Unpause";
  } else {
    control = "Pause";
  }

  return ( //temporarly popup here popup needs work.
    <div className="timer">
      <Popup option={openPopup} onCLose={() => setOpenPopup(false)}/>
      <h1>
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </h1>
      <button onClick={togglePause}>{control}</button>
    </div>
  );
};

TimerCountDown.propTypes = {
    targetArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};


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

    return ( //displays form to fill out
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
        ) : ( //displays completed user info with the TimerCountDown component
          <div>
            <TimerCountDown targetArray={userTimes}/>
            <h4>Name: {userName}</h4>
            <blockquote>{userDes}</blockquote>
            <p>TIMES: {userTimes.join(', ')}</p>
          </div>
        )}
      </div>
    );
}

const Popup = ({option, onCLose}) => {
  if (!option) return null;
  return (
    <div className='overlay'>
      <div className='container'>
        <h4>Did you succeed?</h4>
        <button>Yes</button>
        <button>No</button>
        <button onClick={onCLose}>X</button>
      </div>
    </div>
  )
}

Popup.propTypes = {
    option: PropTypes.bool.isRequired,
    onCLose: PropTypes.func.isRequired,
};
