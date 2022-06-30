import { React } from 'react'
import "./style/Final.css";

export function Final({ color, resultado, refresh }) {

return (
    <>
        <div id="fondo"> </div>

        <div id="popUp">

            {/* <h1>{resultado}</h1>
                <h2>{color}</h2> */}
            <div className="finalImage" id={resultado}></div>

            <button className="buttonFinal" id="buttonFinal1" onClick={() => refresh()}> <span><b>Volver a jugar</b></span></button>

        </div>
    </>
)
}