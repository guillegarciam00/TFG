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
    const [word, setWord] = useState("-");
    const [lastSquare, setLastSquare] = useState("");

    const moviendo = useRef(0);


    useEffect(() => {
        
        var auxArray = []
        var lett = 0
        var numb = 0
        var aux = 1

        var letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
        var numbers = [8, 7, 6, 5, 4, 3, 2, 1]

        var allPieces = [[wRook, "wRook"], [wKnight, "wKnight"], [wBishop, "wBishop"], [wKing, "wKing"], [wQueen, "wQueen"], [wBishop, "wBishop"], [wKnight, "wKnight"], [wRook, "wRook"],
        [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"], [wPawn, "wPawn"],
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
        [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"], [bPawn, "bPawn"],
        [bRook, "bRook"], [bKnight, "bKnight"], [bBishop, "bBishop"], [bKing, "bKing"], [bQueen, "bQueen"], [bBishop, "bBishop"], [bKnight, "bKnight"], [bRook, "bRook"]]



        for (let i = 0; i < 64; i++) {

            if (i % 8 === 0 && i !== 0) {
                lett = 0
                numb++
                aux--
            }

            var pi = allPieces.pop()

            if (aux % 2 !== 0) {
                let square = {
                    "id": i,
                    "color": "light_square",
                    "coord": [letters[lett], numbers[numb]],
                    "image": pi[0],
                    "piece": pi[1]
                }
                auxArray.push(square)

            } else {
                let square = {
                    "id": i,
                    "color": "dark_square",
                    "coord": [letters[lett], numbers[numb]],
                    "image": pi[0],
                    "piece": pi[1]
                }
                auxArray.push(square)
            }
            aux++
            lett++

        }
        setChessBoard(auxArray)
        console.log(auxArray)
    }, []);



    function movePiece(data) {
        var array = chessBoard

        if (moviendo.current === 0) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].coord === data.coord) {
                    setLastSquare(data)
                    setWord(data.piece)
                }
                setChessBoard(array)
            }

            moviendo.current = 1
            document.getElementById(data.id).style.opacity = 0.3;


        } else {

            for (let i = 0; i < array.length; i++) {
                if (array[i].coord === data.coord) {
                    array[i].image = lastSquare.image
                    array[i].piece = lastSquare.piece
                }
                setChessBoard(array)
            }

            for (let i = 0; i < array.length; i++) {
                if (array[i].coord === lastSquare.coord && data.coord !== lastSquare.coord) {
                    array[i].image = ""
                    array[i].piece = ""
                }
                setChessBoard(array)
                setWord("-")
            }

            document.getElementById(lastSquare.id).style.opacity = 1;
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
                            <img className="piece" id={payload.id} src={payload.image} alt="" />
                            <span >{payload.coord}</span>
                        </div>
                    )
                })}

            </div>
        </div>



    )
}