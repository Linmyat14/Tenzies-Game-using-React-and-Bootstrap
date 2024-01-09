import { useEffect, useState } from "react"
import "./App.css"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"


const App = () => {

  const [tenzies, setTenzies] = useState(false);

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
  }
  
  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // console.log(allNewDice());
  const [dice, setDice] = useState(allNewDice());
  
  const rollDice = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
              die :
              generateNewDie()
        }));
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if ( allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!")
    }
  },[dice])

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  const diceElements = dice.map(dice =>
    <Die 
     value={dice.value}
     key={dice.id} 
     holdDice={() => holdDice(dice.id)}
     isHeld={dice.isHeld}/>)
  return (
    
   <main className="m-5 d-flex justify-content-center">
    <div className="game-box d-flex flex-column justify-content-center p-4">
      { tenzies && <Confetti />}
      <h3 className="text-center  mt-4">Tenzies</h3>
      <p className="text-center description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className=" btn btn-primary btn-lg w-50 mx-auto my-3" onClick={rollDice}>{ tenzies ? "New Game" : "Roll"}</button>
    </div>
   </main>
  )
}
export default App
