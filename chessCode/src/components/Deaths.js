import "./style/Death.css";
import bBishopClassic from "./images/pieces/classic/bBishop.png";
import wBishopClassic from "./images/pieces/classic/wBishop.png";
import bPawnClassic from "./images/pieces/classic/bPawn.png";
import wPawnClassic from "./images/pieces/classic/wPawn.png";
import bKingClassic from "./images/pieces/classic/bKing.png";
import wKingClassic from "./images/pieces/classic/wKing.png";
import bKnightClassic from "./images/pieces/classic/bKnight.png";
import wKnightClassic from "./images/pieces/classic/wKnight.png";
import bQueenClassic from "./images/pieces/classic/bQueen.png";
import wQueenClassic from "./images/pieces/classic/wQueen.png";
import bRookClassic from "./images/pieces/classic/bRook.png";
import wRookClassic from "./images/pieces/classic/wRook.png";
import bBishopVector from "./images/pieces/vector/bBishop.png";
import wBishopVector from "./images/pieces/vector/wBishop.png";
import bPawnVector from "./images/pieces/vector/bPawn.png";
import wPawnVector from "./images/pieces/vector/wPawn.png";
import bKingVector from "./images/pieces/vector/bKing.png";
import wKingVector from "./images/pieces/vector/wKing.png";
import bKnightVector from "./images/pieces/vector/bKnight.png";
import wKnightVector from "./images/pieces/vector/wKnight.png";
import bQueenVector from "./images/pieces/vector/bQueen.png";
import wQueenVector from "./images/pieces/vector/wQueen.png";
import bRookVector from "./images/pieces/vector/bRook.png";
import wRookVector from "./images/pieces/vector/wRook.png";
import bBishop3d from "./images/pieces/3d/bBishop.png";
import wBishop3d from "./images/pieces/3d/wBishop.png";
import bPawn3d from "./images/pieces/3d/bPawn.png";
import wPawn3d from "./images/pieces/3d/wPawn.png";
import bKing3d from "./images/pieces/3d/bKing.png";
import wKing3d from "./images/pieces/3d/wKing.png";
import bKnight3d from "./images/pieces/3d/bKnight.png";
import wKnight3d from "./images/pieces/3d/wKnight.png";
import bQueen3d from "./images/pieces/3d/bQueen.png";
import wQueen3d from "./images/pieces/3d/wQueen.png";
import bRook3d from "./images/pieces/3d/bRook.png";
import wRook3d from "./images/pieces/3d/wRook.png";

var allPiecesClassic = [[wRookClassic, "wRook"], [wKnightClassic, "wKnight"], [wBishopClassic, "wBishop"], [wKingClassic, "wKing"], [wQueenClassic, "wQueen"], [wBishopClassic, "wBishop"], [wKnightClassic, "wKnight"], [wRookClassic, "wRook"], [wPawnClassic, "wPawn"],
[bPawnClassic, "bPawn"], [bRookClassic, "bRook"], [bKnightClassic, "bKnight"], [bBishopClassic, "bBishop"], [bKingClassic, "bKing"], [bQueenClassic, "bQueen"], [bBishopClassic, "bBishop"], [bKnightClassic, "bKnight"], [bRookClassic, "bRook"], [wPawnClassic, "wPawnn"], [bPawnClassic, "bPawnn"]]

var allPiecesVector = [[wRookVector, "wRook"], [wKnightVector, "wKnight"], [wBishopVector, "wBishop"], [wKingVector, "wKing"], [wQueenVector, "wQueen"], [wBishopVector, "wBishop"], [wKnightVector, "wKnight"], [wRookVector, "wRook"], [wPawnVector, "wPawn"],
[bPawnVector, "bPawn"], [bRookVector, "bRook"], [bKnightVector, "bKnight"], [bBishopVector, "bBishop"], [bKingVector, "bKing"], [bQueenVector, "bQueen"], [bBishopVector, "bBishop"], [bKnightVector, "bKnight"], [bRookVector, "bRook"], [wPawnVector, "wPawnn"], [bPawnVector, "bPawnn"]]

var allPieces3d = [[wRook3d, "wRook"], [wKnight3d, "wKnight"], [wBishop3d, "wBishop"], [wKing3d, "wKing"], [wQueen3d, "wQueen"], [wBishop3d, "wBishop"], [wKnight3d, "wKnight"], [wRook3d, "wRook"], [wPawn3d, "wPawn"],
[bPawn3d, "bPawn"], [bRook3d, "bRook"], [bKnight3d, "bKnight"], [bBishop3d, "bBishop"], [bKing3d, "bKing"], [bQueen3d, "bQueen"], [bBishop3d, "bBishop"], [bKnight3d, "bKnight"], [bRook3d, "bRook"], [wPawn3d, "wPawnn"], [bPawn3d, "bPawnn"]]


export const Deaths = (props) => {
    const { piece, chessPieces } = props


    //Obtener la imagen de cada pieza
    function getImage(data) {
        if (data.indexOf('King') === -1) {
            if (chessPieces === "classic") {
                for (var i = 0; i < allPiecesClassic.length; i++) {
                    if (data.indexOf(allPiecesClassic[i][1]) > -1) {
                        return allPiecesClassic[i][0]
                    }
                }
            } else if (chessPieces === "vector") {
                for (var i = 0; i < allPiecesVector.length; i++) {
                    if (data.indexOf(allPiecesVector[i][1]) > -1) {
                        return allPiecesVector[i][0]
                    }
                }
            } else {
                for (var i = 0; i < allPieces3d.length; i++) {
                    if (data.indexOf(allPieces3d[i][1]) > -1) {
                        return allPieces3d[i][0]
                    }
                }
            }
        }
        return ""
    }


    return (
        <div id='pieceDeath'>
            <img className="imagePieceDeath" src={getImage(piece)} alt="" />
        </div>
    );
};