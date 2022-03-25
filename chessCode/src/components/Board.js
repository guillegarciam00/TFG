import { React, useState, useEffect, useRef } from 'react';
import "./Board.css";
import { Deaths } from "./Deaths";
import { Square } from './Square';





export function Board(props) {


    const [chessBoard, setChessBoard] = useState([]);
    // const [prevChessBoard, setPrevChessBoard] = useState([]);
    // const [auxChessBoard, setAuxChessBoard] = useState([]);

    const [wdeathPieces, setWDeathPieces] = useState([]);
    const [bdeathPieces, setBDeathPieces] = useState([]);


    const [word, setWord] = useState("-");
    const [lastSquare, setLastSquare] = useState("");
    const moviendo = useRef(0);
    const turno = useRef(0);  //  0 --> blancas || 1 --> negras
    const real = useRef(true);

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
                    "jaque": "",
                    "eliminar": "",
                    "peligrosa": ""
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
                    "jaque": "",
                    "eliminar": "",
                    "peligrosa": ""
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
                    pintarCasillasPosiblesyPeligrosas(data)
                    casillasPeligrosas(data)
                    if (turno.current === 0) {
                        limpiarisJaque()
                        isJaque(data.piece)
                    }

                    for (var i = 0; i < array.length; i++) {
                        if (array[i].coord === data.coord) {
                            setLastSquare(data)
                            setWord(data.piece)
                        }
                        setChessBoard(array)
                    }

                    moviendo.current = 1
                    document.getElementById(data.id).style.opacity = 0.3;
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
                eliminarPieza(array[data.id].piece)
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
                    isJaque("all")
                }

            } else {
                //si no es posible el movimiento, todo vuelve a la normalidad
                array[lastSquare.id].image = lastSquare.image
                array[lastSquare.id].piece = lastSquare.piece
                turno.current = 1 - turno.current

                clearWarnings()
                if (turno.current === 0) {
                    isJaque("all")
                }
            }

            setChessBoard(array)
            setWord("-")
            document.getElementById(lastSquare.id).style.opacity = 1;
            moviendo.current = 0

        }
        // console.log(array)
        isJaqueMate()
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
            moveX = moveX + moves[i][0];
            moveY = moveY + moves[i][1];

            if (moveX < 8 && moveX >= 0 && moveY < 8 && moveY >= 0) {
                let idcoor = idDesdeCoord(moveX, moveY);

                if ((chessBoard[idcoor].piece === "" || chessBoard[idcoor].piece === undefined)) {
                    aux.push([moveX - data.coord[0], moveY - data.coord[1]]);
                } else {
                    if (chessBoard[idcoor].piece.charAt(0) !== data.piece.charAt(0)) {
                        aux.push([moveX - data.coord[0], moveY - data.coord[1]]);
                    }
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

    function pintarCasillasPosiblesyPeligrosas(data) {

        var array = posiblesMovimientos(data)
        if (props.optPosibles) {
            for (let i = 0; i < array.empty.length; i++)
                chessBoard[array.empty[i]].selected = "selected"

            for (let i = 0; i < array.death.length; i++){
                chessBoard[array.death[i]].selected = "selected"
                chessBoard[array.death[i]].eliminar = "comer"
            }
        }
    }

    function idDesdeCoord(x, y) {
        for (var i = 0; i < chessBoard.length; i++)
            if (chessBoard[i].coord[0] === x && chessBoard[i].coord[1] === y)
                return i
    }

    //devuelve un objeto con 3 arrays = 'empty': id's de las casillas libres || 'death': id's de las casillas donde puedes comer una pieza || 'pawnEatEmpty': casillas vacias donde pueden moverse los peones en diagonal
    function posiblesMovimientos(data) {

        let array = {
            "empty": [],
            "death": [],
            "pawnEatEmpty": []
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

            //casillas que el peon podria comerse si hubiera una pieza
            for (let j = 0; j < setMoves(data)[1].length; j++) {
                let x = chessBoard[data.id].coord[0] + setMoves(data)[1][j][0]
                let y = chessBoard[data.id].coord[1] + setMoves(data)[1][j][1]
                let coor = idDesdeCoord(x, y)
                if (x < 8 && x >= 0 && y < 8 && y >= 0 && (chessBoard[coor].piece !== undefined || chessBoard[coor].piece !== ""))
                    array.pawnEatEmpty.push(coor)
            }

        } else {

            for (let i = 0; i < setMoves(data).length; i++) {
                let moveX = data.coord[0] + setMoves(data)[i][0]
                let moveY = data.coord[1] + setMoves(data)[i][1]

                for (let j = 0; j < chessBoard.length; j++) {
                    if (chessBoard[j].coord[0] === moveX && chessBoard[j].coord[1] === moveY) {
                        if (chessBoard[j].piece === undefined || chessBoard[j].piece === "") {
                            array.empty.push(j)
                        } else if (chessBoard[j].piece.charAt(0) !== data.piece.charAt(0)) {
                            array.death.push(j)
                        }
                    }
                }
            }
        }
        return array
    }

    function clearSelected() {
        for (var i = 0; i < chessBoard.length; i++) {
            chessBoard[i].selected = ""
            chessBoard[i].peligrosa = ""
            chessBoard[i].eliminar = ""
        }
    }

    function limpiarisJaque() {
        for (var i = 0; i < chessBoard.length; i++) {
            if (chessBoard[i].selected === "jaque") {
                chessBoard[i].selected = ""
            } else if (chessBoard[i].jaque === "piezaJaque") {
                chessBoard[i].jaque = ""
            }
        }
    }

    function clearWarnings() {
        for (var i = 0; i < chessBoard.length; i++) {
            chessBoard[i].jaque = ""
        }
    }

    function eliminarPieza(piece) {
        if (piece.charAt(0) === "w") {
            var array = wdeathPieces
            array.push(piece)
            setWDeathPieces(array)
        } else {
            array = bdeathPieces
            array.push(piece)
            setBDeathPieces(array)
        }

        if (piece.indexOf('ing') > -1)
            props.victoria(piece.charAt(0))
    }

    function casillasPeligrosas(data) {
        if (props.optPeligro && "w" === data.piece.charAt(0)) {

            var blacks = []
            var peligrosas = []
            var array = []

            for (let i = 0; i < chessBoard.length; i++) {

                if (chessBoard[i].piece.charAt(0) === "b") {
                    if (chessBoard[i].piece.indexOf('awn') > -1) {
                        array = array.concat((posiblesMovimientos(chessBoard[i])).pawnEatEmpty)
                    } else {
                        array = array.concat((posiblesMovimientos(chessBoard[i])).empty)
                    }
                    array = array.concat((posiblesMovimientos(chessBoard[i])).death)


                    for (let j = 0; j < array.length; j++) {
                        blacks.push(array[j])
                    }
                }
            }

            var whites = posiblesMovimientos(chessBoard[data.id]).empty

            for (let j = 0; j < whites.length; j++) {
                if (blacks.includes(whites[j])) {
                    peligrosas.push(whites[j])
                }
            }
            pintarCasillasPeligrosas(peligrosas)
        }
    }

    function pintarCasillasPeligrosas(array) {
        for (let j = 0; j < array.length; j++) {
            chessBoard[array[j]].peligrosa = "peligro"
        }
    }

    function isJaque(pieza) {
        real.current = false
        if (props.optJaque) {
            var jaquePosicionInicial
            var jaquePosicionFinal
            var jaqueking
            for (let i = 0; i < chessBoard.length; i++) {

                if (pieza === "all") {
                    var bool = chessBoard[i].piece.charAt(0) === "w"
                } else {
                    bool = chessBoard[i].piece === pieza
                }

                if (bool) {
                    var array = []

                    // if (chessBoard[i].piece.indexOf('awn') > -1) {
                    //     // array = array.concat((posiblesMovimientos(chessBoard[i])).pawnEatEmpty)
                    // } else {
                    array = array.concat((posiblesMovimientos(chessBoard[i])).death)
                    array = array.concat((posiblesMovimientos(chessBoard[i])).empty)
                    // }

                    for (let j = 0; j < array.length; j++) {
                        var square = {
                            "id": chessBoard[array[j]].id,
                            "coord": chessBoard[array[j]].coord,
                            "piece": chessBoard[i].piece,
                        }
                        var arrayFuturo = (posiblesMovimientos(square)).death
                        for (let k = 0; k < arrayFuturo.length; k++) {
                            if (chessBoard[arrayFuturo[k]].piece === "bKing") {
                                jaquePosicionInicial = chessBoard[i]
                                if (pieza === "all") {
                                    jaque(jaquePosicionInicial)
                                } else {
                                    jaquePosicionFinal = square
                                    jaqueking = chessBoard[arrayFuturo[k]]
                                    jaqueAll(jaquePosicionInicial, jaquePosicionFinal, jaqueking)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function isJaqueMate() {
        for (let i = 0; i < chessBoard.length; i++) {
            if (chessBoard[i].piece.charAt(0) === "w") {
                var array = (posiblesMovimientos(chessBoard[i])).death
                for (let j = 0; j < array.length; j++) {
                    if (chessBoard[array[j]].piece === "bKing")
                        jaquemate(chessBoard[i], chessBoard[array[j]])
                }
            }
        }
    }

    function jaque(inicial) {
        chessBoard[inicial.id].jaque = "piezaJaque"
    }

    function jaqueAll(inicial, final, king) {
        chessBoard[inicial.id].jaque = "piezaJaque"
        chessBoard[final.id].selected = "jaque"
        // chessBoard[king.id].selected = "jaque"
    }


    function jaquemate(data, king) {
        chessBoard[data.id].selected = "jaquemate"
        chessBoard[king.id].selected = "jaquemate"
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