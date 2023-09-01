import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import TimerChoice,{TimerCountDown} from './Components'
import { Timer1, Timer2, Session } from './data'
import { useState } from 'react'

export default function App() {
  const [showMyComp1, setShowMyComp1] = useState(false);
  const [showMyComp2, setShowMyComp2] = useState(false);
  const [showMyComp3, setShowMyComp3] = useState(false);

  return (
    <>
      <h1 className='text-center'>Procrasinot</h1>
      <div className="container d-flex justify-content-center">
          <div className="container border border-primary col-lg ">
            <h1>Study Timers</h1>
            <TimerChoice object={Timer1}/><button onClick={() => setShowMyComp1(!showMyComp1)}>Add this Procrasinoter/Delete this Procrasinoter</button>
            <TimerChoice object={Timer2}/><button onClick={() => setShowMyComp2(!showMyComp2)}>Add this Procrasinoter/Delete this Procrasinoter</button>
            <TimerChoice object={Session}/><button onClick={() => setShowMyComp3(!showMyComp3)}>Needs work, doesn't do anything yet. make templete for user</button>
            {/*need to create inputs here to save into object */}
          </div>
          <div className='container border border-success col-lg '>
            <h1>Timer</h1>
            <TimerCountDown targetTimeInSeconds={1800} />
            {showMyComp1 && <TimerChoice object={Timer1} />}
            {showMyComp2 && <TimerChoice object={Timer2} />}
            {showMyComp3 }{/**add a template for user to creat timer */}
          </div>
          <div className='container border border-success col-lg '>
            <h1>History</h1>
          </div>
        </div>
    </>
  )}
