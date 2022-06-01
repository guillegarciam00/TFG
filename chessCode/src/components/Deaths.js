import "./style/Death.css";
import bBishop from "./images/pieces/bBishop.png";
import wBishop from "./images/pieces/wBishop.png";
import bPawn from "./images/pieces/bPawn.png";
import wPawn from "./images/pieces/wPawn.png";
import bKing from "./images/pieces/bKing.png";
import wKing from "./images/pieces/wKing.png";
import bKnight from "./images/pieces/bKnight.png";
import wKnight from "./images/pieces/wKnight.png";
import bQueen from "./images/pieces/bQueen.png";
import wQueen from "./images/pieces/wQueen.png";
import bRook from "./images/pieces/bRook.png";
import wRook from "./images/pieces/wRook.png";

var allPieces = [[wRook, "wRook"], [wKnight, "wKnight"], [wBishop, "wBishop"], [wKing, "wKing"], [wQueen, "wQueen"], [wBishop, "wBishop"], [wKnight, "wKnight"], [wRook, "wRook"], [wPawn, "wPawn"],
[bPawn, "bPawn"], [wPawn, "wPawnn"], [bPawn, "bPawnn"], [bRook, "bRook"], [bKnight, "bKnight"], [bBishop, "bBishop"], [bKing, "bKing"], [bQueen, "bQueen"], [bBishop, "bBishop"], [bKnight, "bKnight"], [bRook, "bRook"]]

export const Deaths = (props) => {
    const { piece } = props

    //Obtener la imagen de cada pieza
    function getImage(data) {
        for (var i = 0; i < allPieces.length; i++) {
            if (data.indexOf(allPieces[i][1]) > -1) {
                return allPieces[i][0]
            }
        }
        return "error"
    }


    return (
        <div id='pieceDeath'>
            <img className="imagePieceDeath" src={getImage(piece)} alt="" />
        </div>
    );
};