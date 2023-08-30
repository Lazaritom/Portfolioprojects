import './App.css'
import {Timer1, Timer2, Timer} from './data'
import { Component } from 'react'

export default function TimerChoice({name, goal, time}) {
    return (
        <div className="border border-primary">
            <h4>{name}</h4>
            <blockquote>{goal}</blockquote>
            <p>TIME: {time}</p>
        </div>
    )
}