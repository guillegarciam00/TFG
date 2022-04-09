import { useState, useEffect, useRef } from 'react';
import "./style/Board.css";
import "./style/Square.css";
import { Deaths } from "./Deaths";
import { Square } from './Square';
// eslint-disable-next-line
export function Board(props) {

    //Variables del componente padre
    const { optPosibles, optJaque, optPeligro, optMuerte, endGame, myColor, rivalColor, sonar } = props



    //Constantes
    const [chessBoard, setChessBoard] = useState([]);
    // const [prevChessBoard, setPrevChessBoard] = useState([]);
    // const [auxChessBoard, setAuxChessBoard] = useState([]);

    const [wdeathPieces, setWDeathPieces] = useState([]);
    const [bdeathPieces, setBDeathPieces] = useState([]);
    const [lastSquare, setLastSquare] = useState("");
    // eslint-disable-next-line
    const [word, setWord] = useState("-");

    const moviendo = useRef(0); //  0 --> seleccionar pieza  ||  1 --> mover pieza/cancelar movimiento 
    const turno = useRef("w");  //  w --> blancas  ||  b --> negras

    const queenNumber = useRef(0);  //  w --> blancas  ||  b --> negras

    const [Jaque, setJaque] = useState([0, 0]);

    //Movimientos de las piezas

    if (myColor === "w") {
        var bPawnMoves = [[0, -1]]
        var bPawnnMoves = [[0, -1], [0, -2]]
        var bPawnEat = [[-1, -1], [1, -1]]
        var wPawnMoves = [[0, 1]]
        var wPawnnMoves = [[0, 1], [0, 2]]
        var wPawnEat = [[-1, 1], [1, 1]]

    } else {
        wPawnMoves = [[0, -1]]
        wPawnnMoves = [[0, -1], [0, -2]]
        wPawnEat = [[-1, -1], [1, -1]]
        bPawnMoves = [[0, 1]]
        bPawnnMoves = [[0, 1], [0, 2]]
        bPawnEat = [[-1, 1], [1, 1]]
    }

    var BishopMoves = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
    var KingMoves = [[-1, 1], [0, 1], [-1, -1], [-1, 0], [1, 0], [1, 1], [0, -1], [1, -1]]
    var KnightMoves = [[-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1]]
    var QueenMoves = [[-1, 0], [0, 1], [1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
    var RookMoves = [[-1, 0], [0, 1], [1, 0], [0, -1]]

    //Codigo que se ejecuta al comienzo, genera todo el tablero inicial
    useEffect(() => {

        var auxArray = []
        var lett = 0
        var numb = 0
        var aux = 1
        // var letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
        // var numbers = [8, 7, 6, 5, 4, 3, 2, 1]
        var letters = [0, 1, 2, 3, 4, 5, 6, 7]
        var numbers = [7, 6, 5, 4, 3, 2, 1, 0]

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

            if (myColor === "w") {
                var allPi = allPieces.pop()
            } else {
                allPi = allPieces[i]
            }


            if (aux % 2 !== 0) {
                let square = {
                    "id": i,
                    "color": "light_square",
                    "selected": "none",
                    "coord": [letters[lett], numbers[numb]],
                    "image": "",
                    "piece": allPi,
                    "jaque": "",
                    "comer": "",
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
                    "comer": "",
                    "peligrosa": ""
                }
                auxArray.push(square)
            }
            aux++
            lett++
        }
        setChessBoard(auxArray)
        // eslint-disable-next-line
    }, []);

    //Dado unas coordenadas, devulve el id del cuadrado que lo contiene
    function idDesdeCoord(x, y) {
        for (var i = 0; i < chessBoard.length; i++)
            if (chessBoard[i].coord[0] === x && chessBoard[i].coord[1] === y)
                return i
    }

    //Funcion principal que controla el movimiento de las piezas 
    function movePiece(data) {

        limpiarPosiblesPeligrosasComibles()

        //Primera parte del movimiento al clickar en una pieza
        if (moviendo.current === 0) {

            isJaque()

            if (chessBoard[data.id].piece !== undefined && chessBoard[data.id].piece !== "") {

                if ((turno.current === chessBoard[data.id].piece.charAt(0))) {
                    casillasPosiblesyComibles(data)
                    casillasPeligrosas(data)

                    //guardar la pieza para despues colocarla
                    for (var i = 0; i < chessBoard.length; i++) {
                        if (chessBoard[i].coord === data.coord) {
                            setLastSquare(data)
                            setWord(data.piece)
                        }
                    }

                    moviendo.current = 1
                    document.getElementById(data.id).style.opacity = 0.25
                }
            }

        } else {
            //Segunda parte del movimiento al seleccionar otra casilla

            var posibles = posiblesMovimientos(lastSquare)

            //si no es posible el movimiento, todo vuelve a la normalidad
            if (!posibles.empty.includes(data.id) && !posibles.death.includes(data.id)) {

                isJaque()
                chessBoard[lastSquare.id].image = lastSquare.image
                chessBoard[lastSquare.id].piece = lastSquare.piece

            } else {
                if (posibles.death.includes(data.id)) {
                    //la casilla nueva no está libre y nos comemos esa pieza
                    eliminarPieza(chessBoard[data.id].piece)
                    sonar("comer")
                } else {
                    sonar("mover")
                }

                // se sustituyen las casillas
                chessBoard[data.id].image = lastSquare.image
                chessBoard[data.id].piece = lastSquare.piece
                chessBoard[lastSquare.id].image = ""
                chessBoard[lastSquare.id].piece = ""

                //cambiar peon para que solo se mueva 1 posicion
                if (data.piece.indexOf('awnn') > -1) {
                    chessBoard[data.id].piece = data.piece.charAt(0) + "Pawn"
                }

                if (data.piece.indexOf('awn') > -1 && (data.coord[1] === 0 || data.coord[1] === 7)) {
                    chessBoard[data.id].piece = data.piece.charAt(0) + "Queen" + queenNumber.current
                    queenNumber.current = queenNumber.current + 1
                }

                //cambio turno
                turno.current === "w" ? turno.current = "b" : turno.current = "w"
            }

            setWord("-")
            document.getElementById(lastSquare.id).style.opacity = 1;
            moviendo.current = 0

            //si pulsamos otra pieza, se cancela el movim. de la ultima pieza y se calculan los nuevos movim.
            if (data.id !== lastSquare.id) {
                movePiece(data)
            }

            //si despues es mi turno, se calculan las piezas que tengo amenazadas, y todos mis posibles movimientos
            if (turno.current === myColor) {
                piezasQueSePuedenComer()
            }
        }
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
        if (data.piece.indexOf("Queen") > -1) {
            return specialMoves(data, QueenMoves)
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

    //Casillas a las que me puedo mover y piezas que me puedo comer 
    function casillasPosiblesyComibles(data) {

        var array = posiblesMovimientos(data)
        if (optPosibles && turno.current === myColor) {
            for (let i = 0; i < array.empty.length; i++) {
                chessBoard[array.empty[i]].selected = "selected"
            }
            for (let i = 0; i < array.death.length; i++) {
                chessBoard[array.death[i]].selected = "selected"
                chessBoard[array.death[i]].comer = "true"
            }
        }
    }

    function limpiarPosiblesPeligrosasComibles() {
        for (var i = 0; i < chessBoard.length; i++) {
            chessBoard[i].selected = ""
            chessBoard[i].peligrosa = ""
            chessBoard[i].comer = ""
            chessBoard[i].jaque = ""
        }
    }

    //Casillas las cuales si muevo la pieza ahi, está amenzada por otra
    function casillasPeligrosas(data) {
        if (optPeligro && data.piece.charAt(0) === myColor) {
            var rivals = []
            var array = []
            var mines = []

            for (let i = 0; i < chessBoard.length; i++) {
                if (chessBoard[i].piece.charAt(0) === rivalColor) {
                    if (chessBoard[i].piece.indexOf('awn') > -1) {
                        rivals = rivals.concat((posiblesMovimientos(chessBoard[i])).pawnEatEmpty)
                    } else {
                        rivals = rivals.concat((posiblesMovimientos(chessBoard[i])).empty)
                    }
                    rivals = rivals.concat((posiblesMovimientos(chessBoard[i])).death)
                    rivals = rivals.concat((posiblesMovimientos(chessBoard[i])).same)
                }
            }

            mines = mines.concat((posiblesMovimientos(chessBoard[data.id])).empty)
            mines = mines.concat((posiblesMovimientos(chessBoard[data.id])).death)

            //pintar las casillas peligrosas
            for (let j = 0; j < mines.length; j++) {
                if (rivals.includes(mines[j])) {
                    chessBoard[mines[j]].peligrosa = "peligro"
                }
            }
        }
    }

    //devuelve un objeto con 3 arrays = 'empty': id's de las casillas libres || 'death': id's de las casillas donde puedes comer una pieza || 'pawnEatEmpty': casillas vacias donde pueden moverse los peones en diagonal
    function posiblesMovimientos(data) {

        let array = {
            "empty": [],
            "death": [],
            "same": [],
            "pawnEatEmpty": []
        }

        if (data.piece.indexOf('awn') > -1) {

            var obstaculo = false

            //casillas que el peon puede moverse
            for (let i = 0; i < setMoves(data)[0].length; i++) {
                if (!obstaculo) {
                    let moveX = data.coord[0] + setMoves(data)[0][i][0]
                    let moveY = data.coord[1] + setMoves(data)[0][i][1]

                    for (let j = 0; j < chessBoard.length; j++) {
                        if (chessBoard[j].coord[0] === moveX && chessBoard[j].coord[1] === moveY) {
                            if (chessBoard[j].piece === undefined || chessBoard[j].piece === "") {
                                array.empty.push(j)
                                break
                            } else {
                                obstaculo = true
                            }
                        }
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
                        } else {
                            array.same.push(j)
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
                        } else {
                            array.same.push(j)
                        }
                    }
                }
            }
        }
        return array
    }

    //Funcion que manda la pieza eliminada al cementerio
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

        if (piece.indexOf('ing') > -1) {
            sonar("eatKing")
            setTimeout(function () {
                endGame(piece.charAt(0))
            }, 2000);
        }

    }

    //Calcula si tengo posibilidad de hacer jaque en la proxima jugada
    function isJaque() {
        limpiarisJaque()
        var jaqueColor = "w"
        var jaqueRival = "b"
        for (let count = 0; count < 2; count++) {
            if (optJaque) {
                var jaquePosicionInicial
                var jaquePosicionFinal
                var jaqueking
                for (let i = 0; i < chessBoard.length; i++) {
                    if (chessBoard[i].piece.charAt(0) === jaqueColor) {
                        var array = []
                        array = array.concat((posiblesMovimientos(chessBoard[i])).death)
                        array = array.concat((posiblesMovimientos(chessBoard[i])).empty)

                        for (let j = 0; j < array.length; j++) {
                            var square = {
                                "id": chessBoard[array[j]].id,
                                "coord": chessBoard[array[j]].coord,
                                "piece": chessBoard[i].piece,
                            }
                            var arrayFuturo = (posiblesMovimientos(square)).death
                            for (let k = 0; k < arrayFuturo.length; k++) {
                                if (chessBoard[arrayFuturo[k]].piece === jaqueRival + "King") {
                                    // hacerJaque(chessBoard[i], square)
                                    posibleJaque(chessBoard[i])
                                }
                            }
                        }
                    }
                }
            }
            jaqueColor = "b"
            jaqueRival = "w"
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

    function posibleJaque(inicial) {
        chessBoard[inicial.id].jaque = "piezaJaque"
    }

    function hacerJaque(inicial, final, king) {
        chessBoard[inicial.id].jaque = "piezaJaque"
        chessBoard[final.id].selected = "casillaJaque"
        setJaque([inicial.id, final.id])
        // chessBoard[king.id].selected = "jaque"
    }

    //piezas que me puede comer el rival en su proximo turno
    function piezasQueSePuedenComer() {
        for (let i = 0; i < chessBoard.length; i++) {

            //mis piezas amenazadas
            if (chessBoard[i].piece.charAt(0) === rivalColor) {
                let array = (posiblesMovimientos(chessBoard[i])).death
                for (let j = 0; j < array.length; j++) {
                    if (chessBoard[array[j]].piece === myColor + "King") {
                        //Jaque del rival
                        chessBoard[i].selected = "rivalJaque"
                        chessBoard[array[j]].selected = "rivalJaque"
                        //////////////////////////////////////////////////////////////////////
                        sonar("jaque")
                        //////////////////////////////////////////////////////////////////////
                    } else {
                        if (optMuerte)
                            //Piezas que me pueden comer
                            chessBoard[chessBoard[array[j]].id].selected = "malo"
                        // chessBoard[chessBoard[array[j]].id].eliminar = "comer"
                    }
                }

                //piezas que me puedo comer
            } else if ((chessBoard[i].piece.charAt(0) === myColor)) {
                let array = posiblesMovimientos(chessBoard[i]).death
                for (let j = 0; j < array.length; j++) {
                    if (chessBoard[array[j]].piece === rivalColor + "King") {

                        chessBoard[i].jaque = ""
                        chessBoard[i].selected = "rivalJaque"
                        chessBoard[array[j]].selected = "rivalJaque"
                        // hacer que suene "jaque" si me muevo a esa posicion
                    } else {
                        chessBoard[array[j]].comer = "true"
                    }
                }
            }
        }
    }


    //Parte renderizable
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

                <div id="cementerios">

                    <div className='cementerio' id="white_deaths">
                        {wdeathPieces.map((payload, i) => (
                            <div key={i}>
                                <Deaths
                                    piece={payload}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='cementerio' id="black_deaths">
                        {bdeathPieces.map((payload, i) => (
                            <div key={i}>
                                <Deaths
                                    piece={payload}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>


        </div >

    )
}