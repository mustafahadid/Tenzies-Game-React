import  React,{ useEffect} from "react"
import Die from "./components/Die"
import './index.css'
import {nanoid} from "nanoid"
import Confetti from "./components/Confetti"

export default function App(){

    const [dice,setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] =React.useState(false)
    const [counter, setCounter] = React.useState(0)
    const [bestTime, setBestTime] =React.useState(()=> JSON.parse(localStorage.getItem("bestTime"))||[])
    const [seconds, setSeconds] = React.useState(0)
    const [minutes, setMinutes] = React.useState(0)

    var timer;
    useEffect(()=>{
        timer = setInterval(()=>{
            setSeconds(seconds+1)
            if (seconds ===59){
                setMinutes(minutes+1)
                setSeconds(0)
            }
        }, 1000)

        return () => clearInterval(timer)
    })
    
    function resetTime(){
        setMinutes(0)
        setSeconds(0)
    }
    function stopTime(){
        clearInterval(timer)
    }
    useEffect(()=>{
        localStorage.setItem("bestTime", JSON.stringify(bestTime))
    }, [bestTime])

    function handleTime(){
        const value_minute = minutes
        const value_second = seconds
        const NewBestTime = {
            minute: value_minute,
            second: value_second 
        }
        setBestTime(prevState =>
           [NewBestTime, ...prevState]
        )
      
    }
    
    useEffect(()=>{
        const isAllHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if (isAllHeld && allSameValue){
            setTenzies(true)
            handleTime()
            stopTime()
            console.log(Math.min(...bestTime.map(item => item.second)))
        }
    }, [dice])


    function generateNewDie(){
        return {value: Math.ceil(Math.random()* 6), isHeld:false, id: nanoid()}
    }
    
    
    function allNewDice(){
        
        const newDice  = []
        for (let i=0; i<10; i++){
            newDice.push(generateNewDie())
        }
       
        return newDice
    }
  

    function rollDice(){
        if (!tenzies){
            setCounter(counter + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die:
                    generateNewDie()
                }))
        }else {
            setTenzies(false)
            setDice(allNewDice())
            setCounter(0)
            resetTime()
        }
    }


    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld}: die
        }))
    }

    const minSecond = Math.min(...bestTime.map(item => { return  item.second}))

    const minMinute= Math.min(...bestTime.map(item => { return item.minute}))


    const diceElements  = dice.map(die => <Die key={die.id} value={die.value} isHeld= {die.isHeld} holdDice={() => holdDice(die.id)}/>)

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements} 
            </div>
            {counter === 0 ? <p className="counter"></p> : <p className="counter">The dice rolled <strong>{counter}</strong> time</p>}
            {bestTime.length!==0 && <p> Best time Sesion is {minMinute<10 ? "0"+minMinute: minMinute}: {minSecond<10?"0"+minSecond:minSecond}</p>}
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>
        </main>
    )
}