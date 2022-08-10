import React from 'react';


function App() {

  // const [squares, setSquares] = React.useState(new Array(10).fill().map((element) => {
  //   return {
  //     value: Math.floor(Math.random() * 10),
  //     isLocked: false,
  //   }
  // }));

  // For test
  const [squares, setSquares] = React.useState(new Array(10).fill({
    value: 0,
    isLocked: false
  }));

  const [isWin, setIsWin] = React.useState(false);
  
  const squaresBlocks = squares.map((square,index) => {
    return <div className={`square ${square.isLocked === true ? 'green' : null}`} key={index} onClick={(e) => lockSquare(e, index)}><h2>{square.value}</h2></div>
  })
  
  function lockSquare(event, index) {
    setSquares((prevSquares) => {
      const result = prevSquares.map((square, i) => {
        if (i === index) {
          return {
            ...square,
            isLocked: !square.isLocked,
          }
        } else {
          return {
            ...square,
          }
        }
      })

      return result;
    })
  }

  function randomSquares() {
    setSquares((prevSquares) => {
      const result = prevSquares.map((square) => {
        if (square.isLocked === false) {
          return {
            ...square,
            value: Math.floor(Math.random() * 10),
          }    
        } else {
          return {
            ...square,
          }
        }
      })
      return result;
    })
  }
  React.useEffect(() => {
    let win = false;

    // squares.forEach((square) => {
    //   if (square.isTrue === true && square.value === squares[0].value) {
    //     win = true;
    //   } 
    // })

    for (let i = 0; i < squares.length; ++i) {
      const square = squares[i];

      if (square.isLocked === true && square.value === squares[0].value) {
        win = true;
      } else {
        win = false;
        break;
      }
    }

    setIsWin(win === true ? true : false);
  }, [squares]);

  function handleReset() {
    setSquares((prevSquares) => {
      const result = prevSquares.map((square) => {
        return {
          value: 0,
          isLocked: false
        }
      })

      return result;
    })
  }

  return (
    <div className="app">
      <div className="board">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='squaresHolder'>
          {squaresBlocks}
        </div>
        {isWin === true ? <button onClick={handleReset}>Reset</button> : <button onClick={randomSquares}>Roll</button>}
        {isWin === true && <img src='./6SSp.gif' alt='iskra' />}
      </div>
    </div>
  );
}

export default App;
