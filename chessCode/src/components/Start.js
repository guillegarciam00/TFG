import { React } from 'react'
import "./style/Start.css";


export function Start({ whites, blacks, screenPopUp, screenPopUpPiezas, screenPopUpInstr }) {
    return (
        <>
            <div id="fondo"> </div>

            {screenPopUp === "piezas" &&
                <div id="popUp">
                    <button className="buttonInicio" id="buttonInicio1" onClick={screenPopUpInstr}> <span><b>Instrucciones</b></span></button>
                    <h1 id="h1Inicio">¿QUÉ PIEZAS VAS A JUGAR?</h1>
                    <div id="opciones">
                        <div className='backWhite'><div id="whitePieces" onClick={whites}></div></div>
                        <div className='backWhite'><div id="blackPieces" onClick={blacks}></div></div>
                    </div>
                </div>
            }

            {screenPopUp === "instr" &&
                <div id="popUp" className='popUpInstr'>
                    <button className="buttonInicio" id="buttonInicio2" onClick={screenPopUpPiezas}> <span><b>Elegir piezas</b></span></button>
                    <h1 id="h1Inicio">INSTRUCCIONES</h1>

                    <div className="startImage"></div>
                </div>
            }
        </>

    )
}