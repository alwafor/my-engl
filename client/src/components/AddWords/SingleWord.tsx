import React, { ReactElement, useState } from 'react'

interface Props {
   word: string,
   id: number,
   toggleWordId(id: number): void
}

const SingleWord = React.memo(({word,id,toggleWordId}: Props): ReactElement => {
   const [isPressed, setIsPressed] = useState(false);
   const buttonClick = (e: any) => {
      setIsPressed(!isPressed);
      toggleWordId(id);
   }
   console.log("RENDERS!");
   return (
      <div className={"single_word" + (isPressed ? " pressed" : "")}
         onClick={buttonClick}
      >
         {word}
      </div>
   )
});

export default SingleWord;