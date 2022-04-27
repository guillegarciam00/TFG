import { React } from 'react'
import "./style/Final.css";

export function Final({ color, resultado }) {
    return (
        <>
            <div id="fondo"> </div>

            <div id="popUp">

                <h1>{resultado}</h1>
                <h2>{color}</h2>

            </div>

        </>

    )
}




