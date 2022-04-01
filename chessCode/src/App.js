import { useState, useRef } from 'react';
import { Board } from "./components/Board";
import { Inicio } from "./components/Inicio";
import { Final } from "./components/Final";
import Switch from "react-switch";
import { IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";
import './App.css';
import useSound from 'use-sound';
import SoundStart from './components/sounds/start.wav';
import SoundMover from './components/sounds/mover.wav';
import SoundComer from './components/sounds/comer.wav';
import SoundSwitch from './components/sounds/switch.wav';
import SoundEnd from './components/sounds/end.wav';
import SoundJaque from './components/sounds/jaque.wav';



export default function App() {

  const [optPosibles, setOptPosibles] = useState(true);
  const [optPeligro, setOptPeligro] = useState(true);
  const [optJaque, setOptJaque] = useState(true);
  const [optMuerte, setOptMuerte] = useState(true);
  // eslint-disable-next-line
  const [myColor, setMyColor] = useState("");
  const [rivalColor, setRivalColor] = useState("");

  const [tableColor, setTableColor] = useState("default");

  const [colorGanador, setColorganador] = useState("");
  const [resultado, setResultado] = useState("");

  const [appId, setAppId] = useState("inicioBack");

  const [screen, setScreen] = useState("inicio");
  const [screenPopUp, setScrenPopUp] = useState("piezas");

  const [iconVolume, setIconVolume] = useState(<IoMdVolumeHigh />);
  const volume = useRef(1)

  //Sonidos
  // eslint-disable-next-line
  const [playSoundStart] = useSound(SoundStart, { volume: volume.current / 10 });
  const [playSoundMover] = useSound(SoundMover, { volume: volume.current / 10 });
  const [playSoundComer] = useSound(SoundComer, { volume: volume.current / 10 });
  const [playSoundSwitch] = useSound(SoundSwitch, { volume: volume.current / 10 });
  const [playSoundJaque] = useSound(SoundJaque, { volume: volume.current / 10 });
  const [playSoundEnd] = useSound(SoundEnd, { volume: volume.current / 10 });


  function sonar(data) {
    switch (data) {
      case "start": playSoundStart()
        break;
      case "mover": playSoundMover()
        break;
      case "comer": playSoundComer()
        break;
      case "switch": playSoundSwitch()
        break;
      case "jaque": playSoundJaque()
        break;
      case "end": playSoundEnd()
        break;
      default:
        break;
    }
  }




  //controlar los interruptores de los avisos
  function changeOpt(data) {
    switch (data) {
      case "POSIBLES":
        setOptPosibles(!optPosibles)
        break;
      case "PELIGRO":
        setOptPeligro(!optPeligro);
        break;
      case "JAQUE":
        setOptJaque(!optJaque);
        break;
      case "MUERTE":
        setOptMuerte(!optMuerte);
        break;
      default:
    }
    sonar("switch")
  };

  //Se elije color y empieza la partida
  function startGame(mine, rival) {
    sonar("start")
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
    sonar("end")
    color === "w" ? setColorganador("b") : setColorganador("w")
    color === myColor ? setResultado("derrota") : setResultado("victoria")
    setScreen("final")
    setAppId("inicioBack")
  }


  //Generar botones de opciones
  const options = [[optPosibles, "POSIBLES"], [optPeligro, "PELIGRO"], [optJaque, "JAQUE"], [optMuerte, "MUERTE"]]
  var switchers = []
  for (let i = 0; i < 4; i++) {
    switchers.push(
      <div className='option'>
        <label className="switchLabel"> {options[i][1]}</label> <br></br>
        <Switch
          className="switchButton"
          checked={options[i][0]}
          onChange={(e) => changeOpt(options[i][1])}
          offColor="#DF0000"
          // onHandleColor="#2693e6"
          handleDiameter={28}
          // uncheckedIcon={false}
          // checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.5)"
          activeBoxShadow="0px 0px 1px 4px rgba(0, 0, 0, 0.2)"
        // height={25}
        // width={50}
        />
      </div>
    )
  }


  ///////////////////
  //  CHANGE VOLUME
  ///////////////////
  function changeVolume(data) {
    if (data === "iconVolume") {
      if (volume.current === 0) {
        setIconVolume(<IoMdVolumeHigh />);
        volume.current = 5
      } else {
        setIconVolume(<IoMdVolumeOff />);
        volume.current = 0
      }
    } else {
      var vol = document.getElementById("volume").value;
      volume.current = vol
      if (vol < 1) {
        console.log("EY")
        setIconVolume(<IoMdVolumeOff />);
      } else {
        setIconVolume(<IoMdVolumeHigh />);
      }

    }
  }


  function changeColor() {
    //   if(tableColor === "default"){
    //     setTableColor("brown")
    //   }
  }


  //Parte renderizable
  return (
    <div className="App" id={appId}>
      <div id="header">
        <div>
          <p id="volIcon" onClick={() => changeVolume("iconVolume")}>{iconVolume}</p>
          <input type="range" id="volume" value={volume.current} onInput={() => changeVolume("data")} min="0" max="10" step="1"></input>
        </div>
        <div id="refresh">
          <button type="button" id="buttonRefresh" onClick={() => window.location.reload()}>REFRESH</button>
        </div>
        <div id="">
          <button type="button" id="buttonRefresh" onClick={() => changeColor()}>Color</button>
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
              endGame={endGame}
              sonar={sonar}
            />
          </div>
          <div id="AllOptions">
            {switchers.map((payload, i) => (
              <div key={i}>
                {payload}
              </div>
            ))}
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
