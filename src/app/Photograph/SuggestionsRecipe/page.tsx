"use client"
import TinderCard from 'react-tinder-card';

export default function SuggestionsRecipe() {
    const data = ['red', 'blue', 'green'];
  
    const swiped = (direction: string, color: string) => {
      console.log('You swiped ' + direction + ' on ' + color)
    }
  
    const outOfFrame = (color: string) => {
      console.log(color + ' has left the screen')
    }
    return (
      <main>
        {data.map((color, index) => (
          <TinderCard key={index} onSwipe={(dir) => swiped(dir, color)} onCardLeftScreen={() => outOfFrame(color)}>
            <div style={{backgroundColor: color}}>
              {color}
            </div>
          </TinderCard>
        ))}
      </main>  
    );}