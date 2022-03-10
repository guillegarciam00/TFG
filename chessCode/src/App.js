import { useState, useEffect, useRef } from 'react';
import { Board } from "./components/Board";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

function App() {

  const [screen, setScreen] = useState(1);


  useEffect(() => {

  }, []);

  function deletePiece(data) {
    console.log(data)
    data.coord = ""
    // console.log(chessBoard);

  }

  function changeScreen() {
    setScreen(1 - screen);
  }


  return (
    <div className="App">
      <div id="main">

        <div id="header">
          <div id="refresh">
            <button type="button" id="buttonRefresh" onClick={() => window.location.reload()}>REFRESH</button>
          </div>
        </div>
        {screen === 1 &&

          <Board deletePiece={deletePiece} />
        }

        {screen === 0 &&
          <h1>nada</h1>
        }


      </div>

    </div>
  );
}

export default App;
