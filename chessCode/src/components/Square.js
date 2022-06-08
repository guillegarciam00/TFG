import "./style/Square.css";
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
[bPawn, "bPawn"], [bRook, "bRook"], [bKnight, "bKnight"], [bBishop, "bBishop"], [bKing, "bKing"], [bQueen, "bQueen"], [bBishop, "bBishop"], [bKnight, "bKnight"], [bRook, "bRook"], [wPawn, "wPawnn"], [bPawn, "bPawnn"]]

export const Square = (props) => {
    const { payload } = props


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
        <div key={props.id} className={payload.color} id={payload.mal} onClick={() => props.movePiece(payload)}>
            <img className="piece" id={payload.id} src={getImage(payload.piece)} alt="" />
            <span id="id" >{payload.id}</span>
            <span id="coordNum" className="coord">{payload.coordNum}</span>
            <span id="coordLet" className="coord">{payload.coordLet}</span>
            <div className='check' id={payload.check}></div>
            <div className='eat' id={payload.eat}></div>
            <div className='movement' id={payload.selected}></div>
            <div className='warning' id={payload.warning}></div>
        </div>
    );
};