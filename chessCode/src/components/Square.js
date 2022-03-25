import {useState, useEffect, useRef } from 'react';
import bBishop from "./images/piezas/bBishop.png";
import wBishop from "./images/piezas/wBishop.png";
import bPawn from "./images/piezas/bPawn.png";
import wPawn from "./images/piezas/wPawn.png";
import bKing from "./images/piezas/bKing.png";
import wKing from "./images/piezas/wKing.png";
import bKnight from "./images/piezas/bKnight.png";
import wKnight from "./images/piezas/wKnight.png";
import bQueen from "./images/piezas/bQueen.png";
import wQueen from "./images/piezas/wQueen.png";
import bRook from "./images/piezas/bRook.png";
import wRook from "./images/piezas/wRook.png";

var allPieces = [[wRook, "wRook"], [wKnight, "wKnight"], [wBishop, "wBishop"], [wKing, "wKing"], [wQueen, "wQueen"], [wBishop, "wBishop"], [wKnight, "wKnight"], [wRook, "wRook"], [wPawn, "wPawn"],
[bPawn, "bPawn"], [bRook, "bRook"], [bKnight, "bKnight"], [bBishop, "bBishop"], [bKing, "bKing"], [bQueen, "bQueen"], [bBishop, "bBishop"], [bKnight, "bKnight"], [bRook, "bRook"], [wPawn, "wPawnn"], [bPawn, "bPawnn"]]



export const Square = (props) => {
    const {payload} = props



    function getImage(data) {
        for (var i = 0; i < allPieces.length; i++) {
            if (allPieces[i][1] === data) {
                return allPieces[i][0]
            }
        }
        return "error"
    }


    return (
        <div key={props.id} className={payload.color} id={payload.selected} onClick={() => props.movePiece(payload)}>
            <img className="piece" id={payload.id} src={getImage(payload.piece)} alt="" />
            <span id="id" >{payload.id}</span>
            <span id="hide">{payload.coord[0]},{payload.coord[1]}</span>
            <div className='jaque' id={payload.jaque}></div>
            <div className='eliminar' id={payload.eliminar}></div>
            <div className='peligrosa' id={payload.peligrosa}></div>
        </div>
    );
};