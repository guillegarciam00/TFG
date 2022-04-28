import { useState, useRef } from 'react';
import { Board } from "./components/Board";
import { Inicio } from "./components/Inicio";
import { Final } from "./components/Final";
import Switch from "react-switch";
import { IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";

import './App.css';
import useSound from 'use-sound';
import SoundStart from './components/sounds/start.wav';
import SoundMover from './components/sounds/mover.wav';
import SoundComer from './components/sounds/comer.wav';
import SoundSwitch from './components/sounds/switch.wav';
import SoundEnd from './components/sounds/end.wav';
import SoundJaque from './components/sounds/jaque.wav';
import SoundMenu from './components/sounds/menu.wav';
import SoundMenuButton from './components/sounds/menuButton.wav';
import SoundMenuButton2 from './components/sounds/menuButton2.wav';
import SoundChangeVolume from './components/sounds/changeVolume.wav';
import SoundEatKing from './components/sounds/eatKing.wav';
import SoundPeonReina from './components/sounds/peonReina.wav';


export default function App() {

  const [optPosibles, setOptPosibles] = useState(true);
  const [optPeligro, setOptPeligro] = useState(true);
  const [optJaque, setOptJaque] = useState(true);
  const [optMuerte, setOptMuerte] = useState(true);
  const [myColor, setMyColor] = useState("");
  const [rivalColor, setRivalColor] = useState("");

  const [tableColor, setTableColor] = useState("default");

  const [colorGanador, setColorganador] = useState("");
  const [resultado, setResultado] = useState("");

  const [appId, setAppId] = useState("inicioBack");

  const [screen, setScreen] = useState("inicio");
  const [screenPopUp, setScrenPopUp] = useState("piezas");

  const [iconVolume, setIconVolume] = useState(<IoMdVolumeHigh />);
  const volume = useRef(0.5)

  //Sonidos
  const [playSoundStart] = useSound(SoundStart, { volume: volume.current });
  const [playSoundMover] = useSound(SoundMover, { volume: volume.current });
  const [playSoundComer] = useSound(SoundComer, { volume: volume.current });
  const [playSoundSwitch] = useSound(SoundSwitch, { volume: volume.current });
  const [playSoundJaque] = useSound(SoundJaque, { volume: volume.current });
  const [playSoundEnd] = useSound(SoundEnd, { volume: volume.current });
  const [playMenu] = useSound(SoundMenu, { volume: volume.current });
  const [playMenuButton] = useSound(SoundMenuButton, { volume: volume.current });
  const [playMenuButton2] = useSound(SoundMenuButton2, { volume: volume.current });
  const [playChangeVolume] = useSound(SoundChangeVolume, { volume: volume.current });
  const [playEatKing] = useSound(SoundEatKing, { volume: volume.current });
  const [playPeonReina] = useSound(SoundPeonReina, { volume: volume.current });



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
      case "menu": playMenu()
        break;
      case "peonReina": playPeonReina()
        break;
      case "menuButton": playMenuButton()
        break;
      case "menuButton2": playMenuButton2()
        break;
      case "changeVolume": playChangeVolume()
        break;
      case "eatKing": playEatKing()
        break;
      default:
        break;
    }
  }


  //controlar los interruptores de los avisos
  function changeOpt(data) {
    var opacidad = true
    switch (data) {
      case "POSIBLES":
        setOptPosibles(!optPosibles)
        if (optPosibles)
          opacidad = true
        else
          opacidad = false
        break;
      case "PELIGRO":
        setOptPeligro(!optPeligro);
        if (optPeligro)
          opacidad = true
        else
          opacidad = false
        break;
      case "JAQUE":
        setOptJaque(!optJaque);
        if (optJaque)
          opacidad = true
        else
          opacidad = false
        break;
      case "MUERTE":
        setOptMuerte(!optMuerte);
        if (optMuerte)
          opacidad = true
        else
          opacidad = false
        break;
      default:
    }

    if (opacidad) {
      document.getElementById(data).style.opacity = 0.2
    } else {
      document.getElementById(data).style.opacity = 1
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
    sonar("menuButton")
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
        <label className="switchLabel" id={options[i][1]}> {options[i][1]}</label> <br></br>
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
      if (volume.current < 0.1) {
        setIconVolume(<IoMdVolumeHigh />);
        volume.current = 0.5
      } else {
        setIconVolume(<IoMdVolumeOff />);
        volume.current = 0
      }
    } else {
      var vol = document.getElementById("volume").value;
      volume.current = vol
      if (vol < 0.1) {
        setIconVolume(<IoMdVolumeOff />);
      } else {
        setIconVolume(<IoMdVolumeHigh />);
      }
    }
    setTimeout(function () {
      sonar("changeVolume")
    }, 150);
  }


  function changeColor() {
    //   if(tableColor === "default"){
    //     setTableColor("brown")
    //   }
  }


  function toggleFunction() {
    var element = document.getElementById("sidebar");
    element.classList.toggle("active");
    sonar("menuButton2")
  }

  function toggleVolFunction() {
    var element = document.getElementById("volumBar");
    element.classList.toggle("active");
  }

  function Refresh() {
    sonar("end")
    setTimeout(function () {
      window.location.reload()
    }, 500);

  }

  //Parte renderizable
  return (
    <div className="App" id={appId}>

      <div id="header">

        <div id="title">
          <h1 id="h1appjs">CHESSGAME</h1>
        </div>

        <div id="rightHeader">
          <div id="headerRefresh">
            <button type="button" id="buttonRefresh" onClick={() => Refresh()}><BiRefresh /></button>
          </div>

          <div id="headerVolumen">
            <button type="button" id="buttonVolume" onClick={() => toggleVolFunction()}>{iconVolume}</button>
          </div>

          <div id="volumBar">
            <input type="range" className='barra' id="volume" orient="vertical" value={volume.current} onInput={() => changeVolume("data")} min="0" max="1" step="0.1"></input>
            <p id="volIcon" onClick={() => changeVolume("iconVolume")}>{iconVolume}</p>
          </div>
        </div>


        {/* <div id="">
          <button type="button" id="buttonRefresh" onClick={() => toggleFunction()}>Color</button>
        </div> */}

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
          <div id="rightPanel">
            <div id="AllOptions">
              <div id="AllOptionsTitle"><h2>AYUDAS</h2></div>
              {switchers.map((payload, i) => (
                <div key={i}>
                  {payload}
                </div>
              ))}
              <br></br>
            </div>
            <div id="leyendaOptions">
              <button onClick={() => toggleFunction()}>Más información</button>
            </div>
          </div>

          <div id="sidebar">
            <div id="explicaciones">
              <p>~~ ~~~ ~~~~ ~~ ~~ ~~~ ~~~~ ~~</p><br></br>
              <p>~~~ ~~~ ~~~~ ~ ~~ ~~~ ~~~~ ~~</p><br></br>
              <p>~~ ~~~~  ~~~ ~~ ~~ ~~~~  ~~~ ~~</p><br></br>
              <p>~~ ~~~~  ~~~ ~~ ~~ ~~~~  ~~~ ~~</p><br></br>
            </div>
            <div id="leyendaOptions">
              <button id="leyendasCerrar" onClick={() => toggleFunction()}>CERRAR</button>
            </div>
          </div>

        </div>
      }

      {
        screen === "final" &&
        <Final
          color={colorGanador}
          resultado={resultado}
        />
      }
    </div >
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
// suena el jaque todo el rato si es del rival a mi
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
