import { React, useState, useEffect, useRef } from 'react';
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
[bPawn, "bPawn"], [bRook, "bRook"], [bKnight, "bKnight"], [bBishop, "bBishop"], [bKing, "bKing"], [bQueen, "bQueen"], [bBishop, "bBishop"], [bKnight, "bKnight"], [bRook, "bRook"]]


export const Deaths = (props) => {
    const { piece, keyy } = props



    function getImage(data) {
        for (var i = 0; i < allPieces.length; i++) {
            if (allPieces[i][1] === data) {
                return allPieces[i][0]
            }
        }
        return "error"
    }


    return (
        <div key={keyy} id='pieceDeath'>
            <img className="imagePieceDeath" src={getImage(piece)} alt="" />
        </div>
    );
};