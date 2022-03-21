import {useState, useEffect, useRef } from 'react';
import bBishop from "./images/bBishop.png";
import wBishop from "./images/wBishop.png";
import bPawn from "./images/bPawn.png";
import wPawn from "./images/wPawn.png";
import bKing from "./images/bKing.png";
import wKing from "./images/wKing.png";
import bKnight from "./images/bKnight.png";
import wKnight from "./images/wKnight.png";
import bQueen from "./images/bQueen.png";
import wQueen from "./images/wQueen.png";
import bRook from "./images/bRook.png";
import wRook from "./images/wRook.png";

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
            <div className='avisos' id={payload.warning}></div>
        </div>
    );
};