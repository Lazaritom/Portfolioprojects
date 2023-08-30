export const Timer1 = {
    'name': "Timer1",
    "time": 30,
    "break": 5,
    "repeat": 3,
    "Goal": "best use of study time If time is limited to under two hours. For eveyr 30 minutes of studying, you are allowed 5 minutes of rest to make the concepts sink in."
}
export const Timer2 = {
    'name': "Timer2",
    "time": 60,
    "break": 15,
    "repeat": 2,
    "Goal": "Best study timer for periods of 2-2.5 hours. For every 1 hour of studying, you get 15 minutes to allow your brain to rest and the knowledge to solidify in your memory."
}
export const Timer = (name, time, brek, repeat, Goal) => { return { name: name, time: time, break: brek, repeat: repeat, Goal: Goal } }
