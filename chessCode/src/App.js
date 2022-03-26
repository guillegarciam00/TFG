import { useState, useEffect, useRef } from 'react';
import { Board } from "./components/Board";
import { Inicio } from "./components/Inicio";

import './App.css';

export default function App() {


  const [optPosibles, setOptPosibles] = useState(true);
  const [optPeligro, setOptPeligro] = useState(true);
  const [optJaque, setOptJaque] = useState(true);
  const [myColor, setMyColor] = useState("");

  const [appId, setAppId] = useState("inicioBack");


  const [isOpen, setIsOpen] = useState(true)

  const [screen, setScreen] = useState("inicio");
  const [screenPopUp, setScrenPopUp] = useState("piezas");



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

  function victoria(color) {
    if (color === "w") {
      alert("GANAN LAS BLANCAS")
    } else {
      alert("GANAN LAS BLANCAS")
    }
  }


  function startGame(color) {
    setMyColor(color)
    setIsOpen(false)
    setScreen("main")
    setAppId("mainBack")
  }

  function changeScreenPopUp(data) {
    setScrenPopUp(data)
  }

  return (
    <div className="App" id={appId}>
      <div id="header">
        <div id="refresh">
          <button type="button" id="buttonRefresh" onClick={() => window.location.reload()}>REFRESH</button>
        </div>
      </div>

      {screen === "inicio" &&

        <div id="inicio">
          <>
            <Inicio
              open={isOpen}
              onClose={() => startGame("whites")}
              whites={() => startGame("whites")}
              blacks={() => startGame("blacks")}
              screenPopUp={screenPopUp}
              screenPopUpPiezas={() => changeScreenPopUp("piezas")}
              screenPopUpInstr={() => changeScreenPopUp("instr")}
            />
          </>
        </div>
      }

      {screen === "main" &&

        <div id="main">
          <div id="mainBoard">
            <Board optPosibles={optPosibles} optPeligro={optPeligro} optJaque={optJaque} victoria={victoria} />
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

      }




    </div>
  );
}



//
//
//
// BUGS
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
//
//
// 
