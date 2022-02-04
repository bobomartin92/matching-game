import { useEffect, useState } from "react"
import "./App.css"
import SingleCard from "./components/SingleCard";

const cardImages = [
  {"src": "/img/helmet-1.png", matched:false },
  {"src": "/img/potion-1.png", matched:false },
  {"src": "/img/ring-1.png", matched:false },
  {"src": "/img/shield-1.png", matched:false },
  {"src": "/img/sword-1.png", matched:false },
  {"src": "/img/scroll-1.png", matched:false }
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setfirstChoice] = useState(null)  
  const [SecondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false);

  // shuffle card
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
      
      setfirstChoice(null);
      setSecondChoice(null);
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle choice

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setfirstChoice(card);
  }

  // match choices
  useEffect(() => {
    if (firstChoice && SecondChoice) {
      setDisabled(true)
      if (firstChoice.src === SecondChoice.src) {
        setCards(
          prevCards => {
            return prevCards.map(card => {
              if (card.src === firstChoice.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          }
        )
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstChoice, SecondChoice])


  // reset choices and increase turn
  const resetTurn = () => {
    setfirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // automatically start game
  useEffect(() => {
    shuffleCards()
  }, []) 

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === SecondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
