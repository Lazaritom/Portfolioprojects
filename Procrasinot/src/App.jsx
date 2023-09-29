import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import TimerChoice,{TimerCountDown, UserTimer} from './Components'
import { Timer1, Timer2, Session } from './data'
import { useState } from 'react'

export default function App() {
  const [showMyComp1, setShowMyComp1] = useState(false);
  const [showMyComp2, setShowMyComp2] = useState(false);
  const [showMyComp3, setShowMyComp3] = useState(false);

  const validateTime = (compI) => { //makes sure that no other timer can be activiated while a timer is active
    if (!(showMyComp1 || showMyComp2 || showMyComp3)) {
      if (compI === false) {
        return !compI;
      }
    }
    return compI;
  }
  
  return (
    <>
      <h1 className='text-center'>Procrasinot</h1>
      <div className="container d-flex justify-content-center">
          <div className="container border border-primary col-lg" id="Study_timers">
            <h1>Study Timers</h1>
            <TimerChoice object={Timer1}/><button onClick={() => setShowMyComp1(validateTime)}>Add Procrasinoter</button>
            <TimerChoice object={Timer2}/><button onClick={() => setShowMyComp2(validateTime)}>Add Procrasinoter</button>
            <TimerChoice object={Session}/><button onClick={() => setShowMyComp3(validateTime)}>Create Procrasinotor</button>
          </div>
          <div className='container border border-success col-lg' id="Timer">
            <h1>Timer</h1>
            {showMyComp1 && ( //activates timer into #Timer div, creates TimerCHoice with correct array of times
              <>
                <TimerCountDown targetArray={Timer1.time}/>
                <TimerChoice object={Timer1} />
                <button onClick={() => setShowMyComp1(!showMyComp1)}>Delete this Procrasinot</button>
              </>
            )}
            {showMyComp2 && (
              <>
                <TimerCountDown targetArray={Timer2.time}/>
                <TimerChoice object={Timer2} />
                <button onClick={() => setShowMyComp2(!showMyComp2)}>Delete this Procrasinot</button>
              </>
            )}
            {showMyComp3 && ( //uses sppecial form to allow user to enter their peronalized info, TimerCountDown activates in components.jsx if form is submitted
              <>
                <UserTimer/>
                <button onClick={() => setShowMyComp3(!showMyComp3)}>Delete this Procrasinot</button>
              </>
            )}
          </div>
          <div className='container border border-success col-lg' id="History">
            <h1>History</h1>
          </div>
        </div>
    </>
  );
}
