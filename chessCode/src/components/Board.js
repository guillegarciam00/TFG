import React from "react";
import "./Board.css";
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

export function Board(props) {

    var chessBoard = []
    var lett = 0
    var numb = 0
    var aux = 1

    var letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    var numbers = [8, 7, 6, 5, 4, 3, 2, 1]

    var start = [wRook, wKnight, wBishop, wKing, wQueen, wBishop, wKnight, wRook,
        wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn,
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn,
        bRook, bKnight, bBishop, bKing, bQueen, bBishop, bKnight, bRook]

    for (let i = 0; i < 64; i++) {

        if (i % 8 === 0 && i !== 0) {
            lett = 0
            numb++
            aux--
        }

        if (aux % 2 !== 0) {
            let square = {
                "color": "light_square",
                "coord": [letters[lett], numbers[numb]],
                "piece": start.pop()
            }
            chessBoard.push(square)
        } else {
            let square = {
                "color": "dark_square",
                "coord": [letters[lett], numbers[numb]],
                "piece": start.pop()
            }
            chessBoard.push(square)
        }
        aux++
        lett++

    }

    return (
        <div id="board">
            {chessBoard.map((payload) => {
                return (
                    <div className="square" class={payload.color}>
                        <img className="piece" src={payload.piece} alt="" />
                        <span >{payload.coord}</span>

                    </div>

                )
            })}
        </div>
    )
}