import { React } from 'react'
import "./style/Inicio.css";


export function Inicio({ whites, blacks, screenPopUp, screenPopUpPiezas, screenPopUpInstr }) {
    return (
        <>
            <div id="fondo"> </div>

            {screenPopUp === "piezas" &&
                <div id="popUp">
                    <button className="buttonInicio" id="buttonInicio1" onClick={screenPopUpInstr}> <span><b>Instrucciones</b></span></button>
                    <h1>Qué piezas vas a jugar</h1>
                    <div id="opciones">
                        <div className='backWhite'><div id="whitePieces" onClick={whites}></div></div>
                        <div className='backWhite'><div id="blackPieces" onClick={blacks}></div></div>
                    </div>
                </div>
            }

            {screenPopUp === "instr" &&
                <div id="popUp">
                    <button className="buttonInicio" id="buttonInicio2" onClick={screenPopUpPiezas}> <span><b>Elegir piezas</b></span></button>
                    <h1>Como funciona esta guia</h1>
                    <div className='backWhite'>
                        <div id="instr">
                            <p>~~ ~~~ ~~~~ ~~ ~~ ~~~ ~~~~ ~~</p><br></br>
                            <p>~~~ ~~~ ~~~~ ~ ~~ ~~~ ~~~~ ~~</p><br></br>
                            <p>~~ ~~~~  ~~~ ~~ ~~ ~~~~  ~~~ ~~</p><br></br>
                            <p>~~ ~~~~  ~~~ ~~ ~~ ~~~~  ~~~ ~~</p><br></br>
                        </div>
                    </div>
                </div>


            }

        </>

    )
}




