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
    const turno = useRef(0);  //  0 --> blancas || 1 --> negras

    var bPawnMoves = [[0, -1]]
    var bPawnEat = [[-1, -1], [1, -1]]
    var wPawnMoves = [[0, 1]]
    var wPawnEat = [[-1, 1], [1, 1]]
    var BishopMoves = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
    var KingMoves = [[-1, 1], [0, 1], [-1, -1], [-1, 0], [1, 0], [1, 1], [0, -1], [1, -1]]
    var KnightMoves = [[-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1]]
    var QueenMoves = [[-1, 0], [0, 1], [1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
    var RookMoves = [[-1, 0], [0, 1], [1, 0], [0, -1]]


    useEffect(() => {

        var auxArray = []
        var lett = 0
        var numb = 0
        var aux = 1

        // var letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
        // var numbers = [8, 7, 6, 5, 4, 3, 2, 1]
        var letters = [0, 1, 2, 3, 4, 5, 6, 7]
        var numbers = [7, 6, 5, 4, 3, 2, 1, 0]



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
                    "selected": "none",
                    "coord": [letters[lett], numbers[numb]],
                    "image": pi[0],
                    "piece": pi[1]
                }
                auxArray.push(square)

            } else {
                let square = {
                    "id": i,
                    "color": "dark_square",
                    "selected": "none",
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

    }, []);



    function movePiece(data) {
        var array = chessBoard

        if (moviendo.current === 0) {
            if (chessBoard[data.id].piece !== undefined && chessBoard[data.id].piece !== "") {

                if ((turno.current === 0 && "w" === chessBoard[data.id].piece.charAt(0)) || (turno.current === 1 && "b" === chessBoard[data.id].piece.charAt(0))) {
                    pintarCasillas(data)

                    for (var i = 0; i < array.length; i++) {
                        if (array[i].coord === data.coord) {
                            setLastSquare(data)
                            setWord(data.piece)
                        }
                        setChessBoard(array)
                    }

                    moviendo.current = 1
                    document.getElementById(data.id).style.opacity = 0.4;
                    turno.current = 1 - turno.current
                }
            }

        } else {

            //se limpian las casillas de los posibles movimientos
            clearSelected()

            var posibles = posiblesMovimientos(lastSquare)

            //se comprueba si es posible hacer el movimiento
            if (posibles.empty.includes(data.id) || posibles.death.includes(data.id)) {
                array[data.id].image = lastSquare.image
                array[data.id].piece = lastSquare.piece
                array[lastSquare.id].image = ""
                array[lastSquare.id].piece = ""

            } else {
                //si no es posible el movimiento, todo vuelve a la normalidad
                array[lastSquare.id].iFmage = lastSquare.image
                array[lastSquare.id].piece = lastSquare.piece
                turno.current = 1 - turno.current
            }

            setChessBoard(array)
            setWord("-")
            document.getElementById(lastSquare.id).style.opacity = 1;
            moviendo.current = 0
        }
        // console.log(array)
    }

    //devuelve un array con los posibles movimientos de cada figura
    function setMoves(data) {
        switch (data.piece) {
            case "bBishop":
            case "wBishop": return specialMoves(data, BishopMoves)
            case "bPawn": return [bPawnMoves, bPawnEat]
            case "wPawn": return [wPawnMoves, wPawnEat]
            case "bKing":
            case "wKing": return KingMoves
            case "bKnight":
            case "wKnight": return KnightMoves
            case "bQueen":
            case "wQueen": return specialMoves(data, QueenMoves)
            case "bRook":
            case "wRook": return specialMoves(data, RookMoves)
            default: break
        }
    }

    //movimientos de la torre, reina y alfil
    function specialMoves(data, moves) {
        var aux = [];
        var moveX = data.coord[0];
        var moveY = data.coord[1];

        var i = 0
        while (i < moves.length) {
            moveX = moveX + moves[i][0];
            moveY = moveY + moves[i][1];

            if (moveX < 8 && moveX >= 0 && moveY < 8 && moveY >= 0) {
                let idcoor = idDesdeCoord(moveX, moveY);
                if (chessBoard[idcoor].piece === "" || chessBoard[idcoor].piece === undefined) {
                    aux.push([moveX - data.coord[0], moveY - data.coord[1]]);
                } else {
                    moveX = data.coord[0];
                    moveY = data.coord[1];
                    i++;
                }
            } else {
                moveX = data.coord[0];
                moveY = data.coord[1];
                i++;
            }
        }
        return aux;
    }


    function pintarCasillas(data) {
        var array = posiblesMovimientos(data)
        for (let i = 0; i < array.empty.length; i++)
            chessBoard[array.empty[i]].selected = "selected"

        for (let i = 0; i < array.death.length; i++)
            chessBoard[array.death[i]].selected = "death"

    }

    function idDesdeCoord(x, y) {
        for (var i = 0; i < chessBoard.length; i++)
            if (chessBoard[i].coord[0] === x && chessBoard[i].coord[1] === y)
                return i
    }

    function posiblesMovimientos(data) {

        let array = {
            "empty": [],
            "death": []
        }

        if (data.piece.indexOf('awn') > -1) {

            //casillas que el peon puede moverse
            for (let i = 0; i < setMoves(data)[0].length; i++) {
                let moveX = data.coord[0] + setMoves(data)[0][i][0]
                let moveY = data.coord[1] + setMoves(data)[0][i][1]

                for (let j = 0; j < chessBoard.length; j++)
                    if (chessBoard[j].coord[0] === moveX && chessBoard[j].coord[1] === moveY) {
                        if (chessBoard[j].piece === undefined || chessBoard[j].piece === "") {
                            array.empty.push(j)
                        }
                    }
            }

            //piezas que el peon puede comerse
            for (let i = 0; i < setMoves(data)[1].length; i++) {
                let moveX = data.coord[0] + setMoves(data)[1][i][0]
                let moveY = data.coord[1] + setMoves(data)[1][i][1]
                for (let j = 0; j < chessBoard.length; j++)
                    if (chessBoard[j].coord[0] === moveX && chessBoard[j].coord[1] === moveY && (chessBoard[j].piece !== undefined) && chessBoard[j].piece !== "") {
                        console.log(chessBoard[j])
                        if ((chessBoard[j].piece.charAt(0) !== data.piece.charAt(0))) {
                            array.death.push(j)
                        }
                    }
            }

        } else {

            for (let i = 0; i < setMoves(data).length; i++) {
                let moveX = data.coord[0] + setMoves(data)[i][0]
                let moveY = data.coord[1] + setMoves(data)[i][1]

                for (let j = 0; j < chessBoard.length; j++)
                    if (chessBoard[j].coord[0] === moveX && chessBoard[j].coord[1] === moveY) {
                        if (chessBoard[j].piece === undefined || chessBoard[j].piece === "") {
                            array.empty.push(j)
                        } else if (chessBoard[j].piece.charAt(0) !== data.piece.charAt(0)) {
                            array.death.push(j)
                        }
                    }
            }
        }
        return array
    }

    function clearSelected() {
        for (var i = 0; i < chessBoard.length; i++) {
            chessBoard[i].selected = "none"
        }
    }




    return (
        <div>

            <h1>{word}</h1>

            <div id="board">
                {chessBoard.map((payload) => {
                    return (
                        <div key={payload.id} className="square" class={payload.color} id={payload.selected} onClick={() => movePiece(payload)}>
                            <img className="piece" id={payload.id} src={payload.image} alt="" />
                            <span id="hide" >{payload.id}</span>
                            <span id="id">{payload.coord[0]},{payload.coord[1]}</span>
                        </div>
                    )
                })}

            </div>



        </div >

    )
}