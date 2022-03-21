import { useState, useEffect, useRef } from 'react';
import { Board } from "./components/Board";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

function App() {


  const [optPosibles, setOptPosibles] = useState(true);
  const [optPeligro, setOptPeligro] = useState(true);



  useEffect(() => {

  }, []);


  function changeOpt (data){
    switch (data) {
      case "posibles":
        setOptPosibles(!optPosibles)
        break;
        case "peligro":
          setOptPeligro(!optPeligro);
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
          <Board optPosibles={optPosibles} optPeligro={optPeligro} />
        </div>
        <div id="options">
          <input type="checkbox" name="optPeligro" checked={optPosibles} onChange={(e) => changeOpt("posibles")} id="miElementoCheckbox" value="PELIGRO"></input>
          <label htmlFor="optPeligro"> POSIBLES</label> <br></br>
          <input type="checkbox" name="optPeligro" checked={optPeligro} onChange={(e) => changeOpt("peligro")}  id="miElementoCheckbox" value="PELIGRO"></input>
          <label htmlFor="optPeligro"> PELIGRO</label>
        </div>
      </div>


    </div>
  );
}

export default App;
