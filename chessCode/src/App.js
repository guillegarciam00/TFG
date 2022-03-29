import { useState } from 'react';
import { Board } from "./components/Board";
import { Inicio } from "./components/Inicio";
import { Final } from "./components/Final";
import './App.css';

export default function App() {

  const [optPosibles, setOptPosibles] = useState(true);
  const [optPeligro, setOptPeligro] = useState(true);
  const [optJaque, setOptJaque] = useState(true);
  const [optMuerte, setOptMuerte] = useState(true);
  // eslint-disable-next-line
  const [myColor, setMyColor] = useState("");
  const [rivalColor, setRivalColor] = useState("");

  const [colorGanador, setColorganador] = useState("");
  const [resultado, setResultado] = useState("");

  const [appId, setAppId] = useState("inicioBack");

  const [screen, setScreen] = useState("inicio");
  const [screenPopUp, setScrenPopUp] = useState("piezas");



  //controlar los interruptores de los avisos
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
      case "muerte":
        setOptMuerte(!optMuerte);
        break;
      default:

    }
  };

  //Se elije color y empieza la partida
  function startGame(mine, rival) {
    setMyColor(mine)
    setRivalColor(rival)
    setScreen("main")
    setAppId("mainBack")
  }

  //cambiar la pantalla del pop-up
  function changeScreenPopUp(data) {
    setScrenPopUp(data)
  }

  //Una vez que se coma al rey, termina la partida
  function endGame(color) {
    color === "w" ? setColorganador("b") : setColorganador("w")
    color === myColor ? setResultado("derrota") : setResultado("victoria")
    setScreen("final")
    setAppId("inicioBack")
  }

  //Parte renderizable
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
              whites={() => startGame("w", "b")}
              blacks={() => startGame("b", "w")}
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
            <Board
              optPosibles={optPosibles}
              optPeligro={optPeligro}
              optJaque={optJaque}
              optMuerte={optMuerte}
              myColor={myColor}
              rivalColor={rivalColor}
              endGame={endGame} />
          </div>
          <div id="options">
            <input type="checkbox" name="optPeligro" checked={optPosibles} onChange={(e) => changeOpt("posibles")} id="miElementoCheckbox" ></input>
            <label htmlFor="optPeligro"> POSIBLES</label> <br></br>
            <input type="checkbox" name="optPosible" checked={optPeligro} onChange={(e) => changeOpt("peligro")} id="miElementoCheckbox" ></input>
            <label htmlFor="optPosible"> PELIGRO</label> <br></br>
            <input type="checkbox" name="optjaque" checked={optJaque} onChange={(e) => changeOpt("jaque")} id="miElementoCheckbox" ></input>
            <label htmlFor="optjaque"> JAQUE</label><br></br>
            <input type="checkbox" name="optMuerte" checked={optMuerte} onChange={(e) => changeOpt("muerte")} id="miElementoCheckbox" ></input>
            <label htmlFor="optMuerte"> MUERTE</label> <br></br>
          </div>
        </div>

      }

      {screen === "final" &&
        <Final
          color={colorGanador}
          resultado={resultado}
        />
      }


    </div>
  );
}



//
//
//
// BUGS
//
//     // eslint-disable-next-line
//
//
// si hay una pieza delante del peon que no ha hecho movimientos, se lo salta por encima
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
