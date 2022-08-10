import React from 'react';

// Components
import Square from './Square';

export default function Board() {
    
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
    
    // State to know if all elements are locked and identical (WIN) / not 
    const [isWin, setIsWin] = React.useState(false);

    // Hook that has dependency with [squares]-state, to check if it's WIN or not
    React.useEffect(() => {
        let win = false;
    
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

    // Mapping state squares-array to render all Squares
    const squaresBlocks = squares.map((square,index) => {
        return <Square 
        square={square} 
        key={index} 
        lockSquare={lockSquare} 
        index={index}
        />
    })
    
    return (
        <div className="board">
        <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='squaresHolder'>
                {squaresBlocks}
            </div>
            {isWin === true ? <button onClick={handleReset}>Reset</button> : <button onClick={randomSquares}>Roll</button>}
            {isWin === true && <img src='./6SSp.gif' alt='iskra' />}
      </div>
    )

    // Function to lock one certain square
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
    
    // Function to roll not locked squares
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
    
    // Function to reset all board
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

}