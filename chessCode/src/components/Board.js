import { useState, useEffect, useRef } from 'react';
import "./style/Board.css";
import "./style/Square.css";
import { Deaths } from "./Deaths";
import { Square } from './Square';
// eslint-disable-next-line
export function Board(props) {

    //Variables del componente padre
    const { chessBoard, setChessBoard, optPosibles, optEatables, optCheck, optCheckMate, optWarning, optDeath, endGame, myColor, rivalColor, sound, squareDark, squareLight, chessPieces, coordDark, coordLight } = props

    //Constantes
    const [mineDeathPieces, setMineDeathPieces] = useState([]);
    const [rivalDeathPieces, setRivalDeathPieces] = useState([]);
    const [lastSquare, setLastSquare] = useState("");
    const [word, setWord] = useState("-");

    const moving = useRef(0);       //  0 --> seleccionar pieza     ||  1 --> mover pieza/cancelar movimiento 
    const turno = useRef("w");      //  w --> blancas               ||  b --> negras

    const queenNumber = useRef(0);

    const kingPosition = useRef("");

    // const [Jaque, setJaque] = useState([0, 0]);

    //Movimientos de las piezas
    if (myColor === "w") {
        var wPawnMoves = [[0, 1]]
        var wPawnnMoves = [[0, 1], [0, 2]]
        var wPawnEat = [[-1, 1], [1, 1]]
        var bPawnMoves = [[0, -1]]
        var bPawnnMoves = [[0, -1], [0, -2]]
        var bPawnEat = [[-1, -1], [1, -1]]
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
        var coorX = 0
        var coorY = 0
        var aux = 1
        var lett = 0
        var numb = 0
        var num = 0
        var sqcolor
        var allPi

        var coordX = [0, 1, 2, 3, 4, 5, 6, 7]
        var coordY = [7, 6, 5, 4, 3, 2, 1, 0]

        if (myColor === "w") {
            var letters = ["a", "b", "c", "d", "e", "f", "g", "h", ""]
            var numbers = ["8", "7", "6", "5", "4", "3", "2", "1", ""]
        } else {
            letters = ["h", "g", "f", "e", "d", "c", "b", "a", ""]
            numbers = ["1", "2", "3", "4", "5", "6", "7", "8", ""]
        }

        var allPieces = [
            "wRook", "wKnight", "wBishop", "wKing", "wQueen", "wBishop", "wKnight", "wRook",
            "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn", "wPawnn",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn", "bPawnn",
            "bRook", "bKnight", "bBishop", "bKing", "bQueen", "bBishop", "bKnight", "bRook"
        ]

        for (let i = 0; i < 64; i++) {

            if (i % 8 === 0 && i !== 0) {
                coorX = 0
                coorY++
                aux--
                lett = 0
                numb++
                num++
            }

            if (i < 56)
                lett = 8

            if (i % 8 !== 0)
                numb = 8

            myColor === "w" ? allPi = allPieces.pop() : allPi = allPieces[i]
            aux % 2 !== 0 ? sqcolor = "light" : sqcolor = "dark"

            if (aux % 2 !== 0) {
                var letcolor = "coordDark"
                var numColor = "coordDark"
            } else {
                letcolor = "coordLight"
                numColor = "coordLight"
            }

            let square = {
                "id": i,
                "color": sqcolor,
                "selected": "none",
                "coord": [coordX[coorX], coordY[coorY]],
                "coordLet": letters[lett],
                "coordLetColor": letcolor,
                "coordNum": numbers[numb],
                "coordNumColor": numColor,
                "image": "",
                "piece": allPi,
                "check": "",
                "eat": "",
                "squareColor": "",
                "warning": ""
            }
            auxArray.push(square)
            aux++
            coorX++
            lett++
            numb = num
        }
        setChessBoard(auxArray)
    }, []);

    //Dado unas coordenadas, devulve el id del cuadrado que lo contiene
    function coordToId(x, y) {
        for (var i = 0; i < chessBoard.length; i++)
            if (chessBoard[i].coord[0] === x && chessBoard[i].coord[1] === y)
                return i
    }


    //Funcion principal que controla el movimiento de las piezas 
    function movePiece(data) {

        cleanAll()

        //Primera parte del movimiento al clickar en una pieza
        if (moving.current === 0) {

            // copyActualBoard()

            isCheck()

            if (chessBoard[data.id].piece !== undefined && chessBoard[data.id].piece !== "") {

                if ((turno.current === chessBoard[data.id].piece.charAt(0))) {
                    squaresPosiblesEatables(data)
                    squareWarnings(data)

                    //guardar la pieza para despues colocarla
                    for (var i = 0; i < chessBoard.length; i++) {
                        if (chessBoard[i].coord === data.coord) {
                            setLastSquare(data)
                            setWord(data.piece)
                        }
                    }
                    moving.current = 1
                    document.getElementById(data.id).style.opacity = 0.35
                }
            }

        } else {
            //Segunda parte del movimiento al seleccionar otra casilla

            var posibles = posibleMovements(lastSquare)

            //si no es posible el movimiento, todo vuelve a la normalidad
            if (!posibles.empty.includes(data.id) && !posibles.death.includes(data.id)) {

                isCheck()
                chessBoard[lastSquare.id].image = lastSquare.image
                chessBoard[lastSquare.id].piece = lastSquare.piece

            } else {
                if (posibles.death.includes(data.id)) {
                    //la casilla nueva no está libre y nos comemos esa pieza
                    deletePiece(chessBoard[data.id].piece)
                    sound("eat")
                } else {
                    sound("mover")
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

                //si un peon llega al limite se convierte en reina
                if (data.piece.indexOf('awn') > -1 && (data.coord[1] === 0 || data.coord[1] === 7)) {
                    chessBoard[data.id].piece = data.piece.charAt(0) + "Queen" + queenNumber.current
                    queenNumber.current = queenNumber.current + 1
                    sound("peonReina")
                }

                //cambio turno
                turno.current === "w" ? turno.current = "b" : turno.current = "w"


            }

            setWord("-")
            document.getElementById(lastSquare.id).style.opacity = 1;
            moving.current = 0

            //si pulsamos otra pieza, se cancela el movim. de la ultima pieza y se calculan los nuevos movim.
            if (data.id !== lastSquare.id) {
                movePiece(data)
            }

            //si despues es mi turno, se calculan las piezas que tengo amenazadas, y todos mis posibles movimientos
            if (turno.current === myColor) {
                for (var i = 0; i < chessBoard.length; i++) {
                    chessBoard[i].squareColor = ""
                }
                eatablesPieces()
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
                let idcoor = coordToId(moveX, moveY);

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

    //Casillas a las que me puedo mover y piezas que me puedo eat 
    function squaresPosiblesEatables(data) {

        var array = posibleMovements(data)
        if (optPosibles && turno.current === myColor) {
            for (let i = 0; i < array.empty.length; i++) {
                chessBoard[array.empty[i]].selected = "selected"
            }
            for (let i = 0; i < array.death.length; i++) {
                if (optEatables)
                    kingPosition.current === array.death[i] ? chessBoard[array.death[i]].eat = "trueKing" : chessBoard[array.death[i]].eat = "true"
            }
        }
    }

    function cleanAll() {
        for (var i = 0; i < chessBoard.length; i++) {
            chessBoard[i].selected = ""
            chessBoard[i].warning = ""
            chessBoard[i].eat = ""
            chessBoard[i].check = ""
            chessBoard[i].squareColor = ""
        }
    }

    //Casillas las cuales si muevo la pieza ahi, está amenzada por otra
    function squareWarnings(data) {
        if (optWarning && data.piece.charAt(0) === myColor) {
            var rivals = []
            var mines = []

            for (let i = 0; i < chessBoard.length; i++) {
                if (chessBoard[i].piece.charAt(0) === rivalColor) {
                    if (chessBoard[i].piece.indexOf('awn') > -1) {
                        rivals = rivals.concat((posibleMovements(chessBoard[i])).pawnEatEmpty)
                    } else {
                        rivals = rivals.concat((posibleMovements(chessBoard[i])).empty)
                    }
                    rivals = rivals.concat((posibleMovements(chessBoard[i])).death)
                    rivals = rivals.concat((posibleMovements(chessBoard[i])).same)
                }
            }

            mines = mines.concat((posibleMovements(chessBoard[data.id])).empty)
            mines = mines.concat((posibleMovements(chessBoard[data.id])).death)

            //pintar las casillas peligrosas
            for (let j = 0; j < mines.length; j++) {
                if (rivals.includes(mines[j])) {
                    chessBoard[mines[j]].warning = "peligro"
                }
            }
        }
    }

    //devuelve un objeto con 3 arrays = 'empty': id's de las casillas libres || 'death': id's de las casillas donde puedes eat una pieza || 'pawnEatEmpty': casillas vacias donde pueden moverse los peones en diagonal
    function posibleMovements(data) {

        let array = {
            "empty": [],
            "death": [],
            "same": [],
            "pawnEatEmpty": []
        }

        if (data.piece.indexOf('awn') > -1) {

            var obstacle = false

            //casillas que el peon puede moverse
            for (let i = 0; i < setMoves(data)[0].length; i++) {
                if (!obstacle) {
                    let moveX = data.coord[0] + setMoves(data)[0][i][0]
                    let moveY = data.coord[1] + setMoves(data)[0][i][1]

                    for (let j = 0; j < chessBoard.length; j++) {
                        if (chessBoard[j].coord[0] === moveX && chessBoard[j].coord[1] === moveY) {
                            if (chessBoard[j].piece === undefined || chessBoard[j].piece === "") {
                                array.empty.push(j)
                                break
                            } else {
                                obstacle = true
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
                let coor = coordToId(x, y)
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

    //Funcion que manda la pieza eliminada al cemetery
    function deletePiece(piece) {
        if (piece.charAt(0) === myColor) {
            var array = mineDeathPieces
            array.push(piece)
            setMineDeathPieces(array)
        } else {
            array = rivalDeathPieces
            array.push(piece)
            setRivalDeathPieces(array)
        }

        if (piece.indexOf('ing') > -1) {
            sound("eatKing")
            setTimeout(function () {
                endGame(piece.charAt(0))
            }, 2000);
        }
    }

    //Calcula si tengo posibilidad de hacer check en la proxima jugada
    function isCheck() {
        cleanIsCheck()
        var checkColor = "w"
        var checkRival = "b"
        for (let count = 0; count < 2; count++) {
            for (let i = 0; i < chessBoard.length; i++) {
                if (chessBoard[i].piece.charAt(0) === checkColor) {
                    var array = []
                    array = array.concat((posibleMovements(chessBoard[i])).death)
                    array = array.concat((posibleMovements(chessBoard[i])).empty)

                    for (let j = 0; j < array.length; j++) {
                        var square = {
                            "id": chessBoard[array[j]].id,
                            "coord": chessBoard[array[j]].coord,
                            "piece": chessBoard[i].piece,
                        }
                        var arrayFuturo = (posibleMovements(square)).death
                        for (let k = 0; k < arrayFuturo.length; k++) {
                            if (chessBoard[arrayFuturo[k]].piece === checkRival + "King") {
                                // hacerJaque(chessBoard[i], square)
                                posibleCheck(chessBoard[i])
                            }
                        }
                    }
                }
            }
            checkColor = "b"
            checkRival = "w"
        }
    }

    function cleanIsCheck() {
        for (var i = 0; i < chessBoard.length; i++) {
            if (chessBoard[i].selected === "check" || chessBoard[i].squareColor === "pieceDanger") {
                chessBoard[i].selected = ""
                chessBoard[i].peligro = ""
                chessBoard[i].squareColor = ""
            } else if (chessBoard[i].check === "posibleJaque") {
                chessBoard[i].check = ""
            }
        }
    }

    function posibleCheck(inicial) {
        if (chessBoard[inicial.id].squareColor !== "checkmate" && optCheck)
            chessBoard[inicial.id].check = "posibleJaque"
    }


    //pieces que se pueden comer en el proximo turno
    function eatablesPieces() {
        for (let i = 0; i < chessBoard.length; i++) {

            //mis piezas amenazadas
            if (chessBoard[i].piece.charAt(0) === rivalColor) {
                let array = (posibleMovements(chessBoard[i])).death
                for (let j = 0; j < array.length; j++) {
                    if (chessBoard[array[j]].piece === myColor + "King" && optCheckMate) {
                        //Jaque del rival
                        chessBoard[i].squareColor = "checkmate"
                        chessBoard[array[j]].squareColor = "checkmate"

                        //////////////////////////////////////////////////////////////////////
                        sound("check")
                        //////////////////////////////////////////////////////////////////////
                    } else {
                        if (optDeath)
                            //Piezas que me pueden eat
                            chessBoard[chessBoard[array[j]].id].squareColor = "pieceDanger"
                    }
                }

                //pieces que me puedo comer
            } else if ((chessBoard[i].piece.charAt(0) === myColor)) {
                let array = posibleMovements(chessBoard[i]).death
                for (let j = 0; j < array.length; j++) {
                    if (chessBoard[array[j]].piece === rivalColor + "King") {
                        chessBoard[i].check = ""
                        if (optCheckMate) {
                            chessBoard[i].squareColor = "checkmate"
                            chessBoard[array[j]].squareColor = "checkmate"
                            kingPosition.current = array[j]
                        }
                        //////////////////////// hacer que suene "check" si me muevo a esa posicion
                    } else {
                        chessBoard[array[j]].selected = ""
                        // chessBoard[array[j]].eat = "true"
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
                            chessPieces={chessPieces}
                            squareDark={squareDark}
                            squareLight={squareLight}
                            coordLight={coordLight}
                            coordDark={coordDark}
                        />
                    ))}
                </div>

                <div id="cemeteries">
                    <div className='cemetery' id="white_deaths">
                        {mineDeathPieces.map((payload, i) => (
                            <div key={i}>
                                <Deaths
                                    piece={payload}
                                    chessPieces={chessPieces}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='cemetery' id="black_deaths">
                        {rivalDeathPieces.map((payload, i) => (
                            <div key={i}>
                                <Deaths
                                    piece={payload}
                                    chessPieces={chessPieces}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div >
    )
}