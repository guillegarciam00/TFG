import { React, useState, useEffect, useRef } from 'react';
import "./Board.css";
import { Deaths } from "./Deaths";
import { Square } from './Square';

export function Board(props) {


    const [chessBoard, setChessBoard] = useState([]);
    const [prevChessBoard, setPrevChessBoard] = useState([]);
    const [auxChessBoard, setAuxChessBoard] = useState([]);

    const [wdeathPieces, setWDeathPieces] = useState([]);
    const [bdeathPieces, setBDeathPieces] = useState([]);


    const [word, setWord] = useState("-");
    const [lastSquare, setLastSquare] = useState("");
    const moviendo = useRef(0);
    const turno = useRef(0);  //  0 --> blancas || 1 --> negras

    var bPawnMoves = [[0, -1]]
    var bPawnnMoves = [[0, -1], [0, -2]]
    var bPawnEat = [[-1, -1], [1, -1]]
    var wPawnMoves = [[0, 1]]
    var wPawnnMoves = [[0, 1], [0, 2]]
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


        // var blackPieces = ["bPawn", "bKing", "bQueen", "bBishop", "bKnight", "bRook"]



        var allPieces = ["wRook", "wKnight", "wBishop", "wKing", "wQueen", "wBishop", "wKnight", "wRook", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bRook", "bKnight", "bBishop", "bKing", "bQueen", "bBishop", "bKnight", "bRook"]

        for (let i = 0; i < 64; i++) {

            if (i % 8 === 0 && i !== 0) {
                lett = 0
                numb++
                aux--
            }

            var allPi = allPieces.pop()

            if (aux % 2 !== 0) {
                let square = {
                    "id": i,
                    "color": "light_square",
                    "selected": "none",
                    "coord": [letters[lett], numbers[numb]],
                    "image": "",
                    "piece": allPi,
                    "warning": ""
                }
                auxArray.push(square)

            } else {
                let square = {
                    "id": i,
                    "color": "dark_square",
                    "selected": "none",
                    "coord": [letters[lett], numbers[numb]],
                    "image": "",
                    "piece": allPi,
                    "warning": ""
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
            var movimiento = false

            //se comprueba si es posible hacer el movimiento
            if (posibles.empty.includes(data.id)) {
                movimiento = true

            } else if (posibles.death.includes(data.id)) {
                eliminacion(array[data.id].piece)
                movimiento = true
            }

            if (movimiento) {
                array[data.id].image = lastSquare.image
                array[data.id].piece = lastSquare.piece
                array[lastSquare.id].image = ""
                array[lastSquare.id].piece = ""

                if (data.piece.indexOf('awnn') > -1) {
                    array[data.id].piece = data.piece.charAt(0) + "Pawn"
                }

                clearWarnings()

                if (turno.current === 0) {
                    //casillas a evitar
                    casillasPeligrosas()
                }

            

            } else {
                //si no es posible el movimiento, todo vuelve a la normalidad
                array[lastSquare.id].image = lastSquare.image
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
            case "bPawnn": return [bPawnnMoves, bPawnEat]
            case "wPawnn": return [wPawnnMoves, wPawnEat]
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
        var comido = 0
        var moveX = data.coord[0];
        var moveY = data.coord[1];

        var i = 0
        while (i < moves.length) {
            comido = 0
            moveX = moveX + moves[i][0];
            moveY = moveY + moves[i][1];

            if (moveX < 8 && moveX >= 0 && moveY < 8 && moveY >= 0) {
                let idcoor = idDesdeCoord(moveX, moveY);
                if ((chessBoard[idcoor].piece === "" || chessBoard[idcoor].piece === undefined)) {
                    aux.push([moveX - data.coord[0], moveY - data.coord[1]]);

                } else if (chessBoard[idcoor].piece.charAt(0) !== data.piece.charAt(0) && comido === 0) {
                    aux.push([moveX - data.coord[0], moveY - data.coord[1]]);
                    comido = 1
                    i++;
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
        if (props.optPosibles) {
            for (let i = 0; i < array.empty.length; i++)
                chessBoard[array.empty[i]].selected = "selected"
        }


        for (let i = 0; i < array.death.length; i++)
            chessBoard[array.death[i]].selected = "death"

    }

    function idDesdeCoord(x, y) {
        for (var i = 0; i < chessBoard.length; i++)
            if (chessBoard[i].coord[0] === x && chessBoard[i].coord[1] === y)
                return i
    }

    //devuelve un objeto con 2 arrays = 'empty': id's de las casillas libres || 'death': id's de las casillas donde puedes comer una pieza
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

    function clearWarnings() {
        for (var i = 0; i < chessBoard.length; i++) {
            chessBoard[i].warning = ""
        }
    }

    function eliminacion(piece) {
        if (piece.charAt(0) === "w") {
            var array = wdeathPieces
            array.push(piece)
            setWDeathPieces(array)
        } else {
            var array = bdeathPieces
            array.push(piece)
            setBDeathPieces(array)
        }
    }

    function casillasPeligrosas() {
        if (props.optPeligro) {
            for (let i = 0; i < chessBoard.length; i++) {
                if (chessBoard[i].piece.charAt(0) === "b") {

                    if (chessBoard[i].piece.indexOf('awn') > -1) {
                        for (let j = 0; j < bPawnEat.length; j++) {
                            let x = chessBoard[i].coord[0] + bPawnEat[j][0]
                            let y = chessBoard[i].coord[1] + bPawnEat[j][1]
                            if (x < 8 && x >= 0 && y < 8 && y >= 0)
                                chessBoard[idDesdeCoord(x, y)].warning = "red"
                        }
                    } else {
                        var array = (posiblesMovimientos(chessBoard[i])).empty
                        for (let j = 0; j < array.length; j++) {

                            chessBoard[array[j]].warning = "red"
                        }
                    }
                }
            }
        }
    }


    return (
        <div>
            {/* <h1>{word}</h1> */}
            <div id="GameBoard">
                <div id="board">
                    {chessBoard.map((payload) => (
                        <Square
                            key={payload.id}
                            payload={payload}
                            movePiece={movePiece}
                        />
                    ))}

                </div>

                <div className='cementerio' id="white_deaths">
                    {wdeathPieces.map((payload) => (
                        <Deaths
                            keyy={(Math.random() + 1).toString(36).substring(7)}
                            piece={payload}
                        />

                    ))}
                </div>

                <div className='cementerio' id="black_deaths">
                    {bdeathPieces.map((payload) => (
                        <Deaths
                            keyy={(Math.random() + 1).toString(36).substring(7)}
                            piece={payload}
                        />

                    ))}
                </div>

            </div>


        </div >

    )
}