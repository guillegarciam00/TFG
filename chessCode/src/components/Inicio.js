import { React } from 'react'
import "./style/Inicio.css";


export function Inicio({ whites, blacks, screenPopUp, screenPopUpPiezas, screenPopUpInstr }) {
    return (
        <>
            <div id="fondo"> </div>

            {screenPopUp === "piezas" &&
                <div id="popUp">
                    <button id="buttonClose" onClick={screenPopUpInstr}><b>Instrucciones {'>>'}</b></button>
                    <h1>Qué piezas vas a jugar</h1>
                    <div id="opciones">
                        <div className='backWhite'><div id="whitePieces" onClick={whites}></div></div>
                        <div className='backWhite'><div id="blackPieces" onClick={blacks}></div></div>
                    </div>
                </div>
            }

            {screenPopUp === "instr" &&
                <div id="popUp">
                    <button id="buttonClose" onClick={screenPopUpPiezas}><b>{'<<'} Elegir piezas</b></button>
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




