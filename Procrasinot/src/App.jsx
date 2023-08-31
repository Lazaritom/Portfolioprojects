import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import TimerChoice,{Timer} from './Components'
import { Timer1, Timer2, Session } from './data'

export default function App() {
  return (
    <>
      <h1 className='text-center'>Procrasinot</h1>
      <div className="container d-flex justify-content-center">
          <div className="container border border-primary col-lg ">
            <h1>Study Timers</h1>
            <TimerChoice name={Timer1.name} goal={Timer1.goal} time={Timer1.time}/>
            <TimerChoice name={Timer2.name} goal={Timer2.goal} time={Timer2.time}/>
            <TimerChoice name={Session.name} goal={Session.goal} time={Session.time}/> 
            {/*need to create inputs here to save into object */}
          </div>
          <div className='container border border-success col-lg '>
            <h1>Timer</h1>
            <Timer />
          </div>
          <div className='container border border-success col-lg '>
            <h1>History</h1>
          </div>
        </div>
    </>
  )}
