import { useState, useEffect, useRef } from 'react';
import { Board } from "./components/Board";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

function App() {


  const [optPosibles, setOptPosibles] = useState(true);
  const [optPeligro, setOptPeligro] = useState(true);
  const [optJaque, setOptJaque] = useState(true);



  useEffect(() => {

  }, []);


  function changeOpt(data) {
    switch (data) {
      case "posibles":
        setOptPosibles(!optPosibles)
        break;
      case "peligro":
        setOptPeligro(!optPeligro);
        break;
      case "jaque":
        setOptJaque(!optJaque);
        break;

    }
  };


  return (
    <div className="App">

      <div id="header">
        <div id="refresh">
          <button type="button" id="buttonRefresh" onClick={() => window.location.reload()}>REFRESH</button>
        </div>
      </div>
      <div id="main">
        <div id="mainBoard">
          <Board optPosibles={optPosibles} optPeligro={optPeligro} optJaque={optJaque} />
        </div>
        <div id="options">
          <input type="checkbox" name="optPeligro" checked={optPosibles} onChange={(e) => changeOpt("posibles")} id="miElementoCheckbox" ></input>
          <label htmlFor="optPeligro"> POSIBLES</label> <br></br>
          <input type="checkbox" name="optPosible" checked={optPeligro} onChange={(e) => changeOpt("peligro")} id="miElementoCheckbox" ></input>
          <label htmlFor="optPosible"> PELIGRO</label> <br></br>
          <input type="checkbox" name="optjaque" checked={optJaque} onChange={(e) => changeOpt("jaque")} id="miElementoCheckbox" ></input>
          <label htmlFor="optjaque"> JAQUE</label>
        </div>
      </div>


    </div>
  );
}

export default App;

// 
//
// 
// BUGS
// 
//  la reina hace algunos posibles movimientos extraños
//  se tiene en cuenta el doble movimiento del peon inicial, para marcar esa casilla como peligrosa
//  
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
