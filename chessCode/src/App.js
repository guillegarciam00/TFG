import { useState, useEffect, useRef } from 'react';
import { Board } from "./components/Board";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

function App() {

  useEffect(() => {
    console.log("ggegw")
    console.disableYellowBox = true;
    console.log = console.warn = console.error = () => { };
  }, []);

  return (
    <div className="App">
      <div id="main">
        <Board />
      </div>

    </div>
  );
}

export default App;
