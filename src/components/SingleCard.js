import "./SingleCard.css"


const SingleCard = (props) => {
    const {card, handleChoice, flipped, disabled} = props

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }  
    }
    return (
        <div className="card">
            <div className={flipped ? "flip" : ''}>
              <img className="front" src={card.src} alt="front card" />
              <img 
                className="back" 
                src="/img/cover.png" 
                alt="back card" 
                onClick={handleClick}
              />
            </div>
        </div>
    );
}
 
export default SingleCard;