import React from "react";
import "./Board.css";

export function Board(props) {

    var chessBoard = []
    var aux = 1

    for (let i = 1; i < 65; i = i + 1) {

        if ((i - 1) % 8 == 0 && i != 0) {
            aux = aux - 1
        }

        if (aux % 2 != 0) {
            chessBoard.push(<span class="square" class="dark_square">{i}</span>)
        } else {
            chessBoard.push(<span class="square" class="white_square">{i}</span>)
        }
        aux++

    }



    return (
        <div id="board"> {chessBoard}</div>
    )
}