import { React, useState, useEffect, useRef } from 'react';
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


    const [chessBoard, setChessBoard] = useState([]);
    const [word, setWord] = useState("");
    const [lastPiece, setLastPiece] = useState("");
    const [lastCoord, setLastCoord] = useState("");
    const [lastId, setLastId] = useState("");
    const moviendo = useRef(0);

    var auxArray = []
    var lett = 0
    var numb = 0
    var aux = 1

    var letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    var numbers = [8, 7, 6, 5, 4, 3, 2, 1]

    var allPieces = [[wRook, "wRook"], [wKnight, "wKnight"], [wBishop, "wBishop"], [wKing, "wKing"], [wQueen, "wQueen"], [wBishop, "wBishop"], [wKnight, "wKnight"], [wRook, wRook]
    [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"]
    [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"]
    [bRook, "bRook"], [bKnight, "bKnight"], [bBishop, "bBishop"], [bKing, "bKing"], [bQueen, "bQueen"], [bBishop, "bBishop"], [bKnight, "bKnight"], [bRook, bRook]]


    var start = [wRook, wKnight, wBishop, wKing, wQueen, wBishop, wKnight, wRook,
        wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn,
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn,
        bRook, bKnight, bBishop, bKing, bQueen, bBishop, bKnight, bRook]


    useEffect(() => {
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
                    "id": i,
                    "piece": start.pop()
                }

                auxArray.push(square)
            } else {
                let square = {
                    "color": "dark_square",
                    "coord": [letters[lett], numbers[numb]],
                    "id": i,
                    "piece": start.pop()
                }
                auxArray.push(square)
            }
            aux++
            lett++

        }
        setChessBoard(auxArray)
    }, []);



    function movePiece(data) {
        if (moviendo.current === 0) {
            document.getElementById(data.id).style.opacity = 0.2;
            var array = chessBoard
            for (var i = 0; i < array.length; i++) {
                if (array[i].coord == data.coord) {

                    let a = data.piece
                    // array[i].piece = lastPiece
                    setLastPiece(a)
                    setLastCoord(data.coord)
                    setLastId(data.id)
                    setWord(data.id)
                }
                setChessBoard(array)
                console.log("todo", chessBoard)
            }

            moviendo.current = 1

        } else {
            var array = chessBoard
            for (var i = 0; i < array.length; i++) {
                if (array[i].coord == data.coord) {

                    let a = data.piece
                    array[i].piece = lastPiece
                    setLastPiece(a)
                    setWord(data.id)
                }
                setChessBoard(array)
                console.log("todo", chessBoard)
            }

            for (var i = 0; i < array.length; i++) {
                if (array[i].coord == lastCoord) {
                    array[i].piece = ""
                }
                setChessBoard(array)
            }
            document.getElementById(lastId).style.opacity = 1;
            moviendo.current = 0
        }




    }

    return (
        <div>
            <h1>{word}</h1>

            <div id="board">
                {chessBoard.map((payload) => {
                    return (
                        <div key={payload.id} className="square" class={payload.color} onClick={() => movePiece(payload)}>
                            <img className="piece" id={payload.id} src={payload.piece} alt="" />
                            <span >{payload.coord}</span>
                        </div>
                    )
                })}
                {/* <img className="piece" src={lastPiece} alt="" /> */}
            </div>
        </div>



    )
}