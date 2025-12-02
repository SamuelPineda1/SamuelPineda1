// Samuel Pineda - 000917696 - 19/07/2024

let positionArray = [[false,275,150],[false,235,225],[false,315,225],[false,195,300],
[false,275,300],[false,355,300],[false,150,375],[false,235,375],[false,315,375],
[false,400,375],[false,110,450],[false,195,450],[false,275,450],[false,355,450],[false,440,450]];

let avaliableMovements = [
    [3,5],
    [6,8],
    [7,9],
    [0,5,10,12],
    [11,13],
    [0,3,12,14],
    [1,8],
    [2,9],
    [1,6],
    [2,7],
    [3,12],
    [4,13],
    [3,5,10,14],
    [4,11],
    [5,12]
];
let avaliableMovementsEliminate = [
    [1,2],
    [3,4],
    [4,5],
    [1,4,6,7],
    [7,8],
    [2,4,8,9],
    [3,7],
    [4,8],
    [4,7],
    [5,8],
    [6,11],
    [7,12],
    [7,8,11,13],
    [8,12],
    [9,13]
];
const colorsArray = [
    "red",
    "green",
    "blue",
    "orange",
    "white",
    "cyan",
    "magenta",
    "DarkGoldenRod",
    "maroon",
    "olive",
    "purple",
    "deeppink",
    "navy",
    "lime",
    "aqua"
];

let firstMovement = true;
let midMovement = false;
let currentTry;
let marbleArray = [];  
let numberOfTries = 0;
let endGame = false;

const svgNS = "http://www.w3.org/2000/svg";

let marblePosition = 0;

let movements = 0;

let svg = document.getElementById("svg");

function startGame(){
    console.log("Game started");
    firstMovement = true;
    var marbleID = 0;
    for (let i = 0; i < 15; i++){

        // Create the marbles

        let marble = document.createElementNS(svgNS, "circle");
        marble.setAttribute("id","marble" + marbleID);
        marble.setAttribute("r", 25);
        marble.setAttribute("cx",positionArray[i][1]);
        marble.setAttribute("cy",positionArray[i][2]);
        //console.log(positionArray[marblePosition]);
        marble.setAttribute("fill", colorsArray[i]);
        marble.setAttribute("stroke", "black");
        marble.setAttribute("stroke-width", 4);
        marble.setAttribute("onclick", "movementChoice(\"marble" + marbleID + "\")");
        //console.log("Marble " + marbleID + " Created");
        //console.log(marble);
        svg.appendChild(marble);
        marbleID++;
        positionArray[i][0] = true;
        marbleArray[i] = [true, colorsArray[i], i];


    }
    document.getElementById("startButton").innerHTML = "Restart game";
    document.getElementById("startButton").setAttribute("onclick","restartGame()");
    document.getElementById("guide").innerHTML = "Now choose the first marble that you want to eliminate";   

}

function restartGame(){
    movements = 0;
    midMovement = false;
    currentTry = countBoardMarbles();
    numberOfTries++;
    let endRectangle = document.getElementById("endRectangle");
    let endText = document.getElementById("endText");
    if (endGame == true && endRectangle != null && endText != null){
        svg.removeChild(endRectangle);
        svg.removeChild(endText);
        endGame = false;
    }
    updateNumberOfTries();
    updateBestTry();
    destroyAllMarbles();
    resetAllSpaces();
    updateMovements();
    startGame();
}

function updateBestTry(){
    console.log("best try working");
    let bestTry = parseInt(document.getElementById("bestTry").innerHTML);
    console.log("best try current try:" + currentTry);
    console.log("best try best try:" + bestTry);
    if (currentTry < bestTry){
        document.getElementById("bestTry").innerHTML = currentTry;
    }
}

function updateNumberOfTries(){
    document.getElementById("tries").innerHTML = numberOfTries;
}

function countBoardMarbles(){
    let count = 0;
    for (let i = 0; i < 15; i++){
        if (marbleArray[i][0]){
            count++;
        }
    }
    return count;
}

function resetAllSpaces(){
    for (let i = 0; i < 15; i++){
        document.getElementById("position" + i).setAttribute("stroke", "black");
        document.getElementById("position" + i).setAttribute("onclick","");
    }
}

function movementChoice(id){
    let marble = document.getElementById(id);
    let idNumber = parseInt(id.substring(6), 10);
    console.log(id);
    if (firstMovement){
        // The first marble choosed is always eliminated
        firstMovement = false;
        destroyMarble(idNumber);
        movements++;
        updateMovements();
        document.getElementById("guide").innerHTML = "Choose the first marble that you want to move";
    }
    else if (!midMovement){
        let posibleMovementPositions = movementCheck(idNumber);
        if (posibleMovementPositions.length > 0){
            marble.setAttribute("stroke", "yellow");
            document.getElementById("guide").innerHTML = "Now choose the place where you want this marble to go";
            midMovement = true;
            secondMovement(idNumber, posibleMovementPositions);
        }
        else{
            document.getElementById("guide").innerHTML = "Not a marble that can be moved, choose again.";
            marble.setAttribute("stroke", "black");
        }
    }
}

function destroyAllMarbles(){
    for (let i = 0; i < 15; i++){
        destroyMarble(i);
    }
}

function destroyMarble(idNumber){
    let node = document.getElementById("marble" + idNumber);
    let currentPosition = marbleArray[idNumber][2];
    if (marbleArray[idNumber][0]){
        svg.removeChild(node);
        marbleArray[idNumber][0] = false;
        marbleArray[idNumber][1] = null;
        marbleArray[idNumber][2] = null;
        positionArray[currentPosition][0] = false;
    }
}


function updateMovements(){
    let label = document.getElementById("numberOfMovements");
    label.innerHTML = movements;
}

function movementCheck(idNumber){
    let positionToCheck = marbleArray[idNumber][2];
    let posibleMovementPositions = [];
    let checkPositionFor;
    let checkJumpMarble;    
    if (positionToCheck == null){
        return posibleMovementPositions;
    }
    console.log("Position to check : " + positionToCheck);

    for (let i = 0; i < avaliableMovements[positionToCheck].length; i++){
        checkPositionFor = avaliableMovements[positionToCheck][i];
        checkJumpMarble = idOfMarbleInThisPosition(avaliableMovementsEliminate[positionToCheck][i]);
        if (checkJumpMarble != null){
            if (!positionArray[checkPositionFor][0] && marbleArray[checkJumpMarble][0]){
                posibleMovementPositions.push(checkPositionFor);
                console.log("New posible movement position added : " + checkPositionFor);
            }
        }
    }
    
    if (posibleMovementPositions.length != 0){
        let positionInTheArray;
        for (let i = 0; i < posibleMovementPositions.length; i++){
            positionInTheArray = posibleMovementPositions[i];
            if (!positionArray[positionInTheArray][0]){
                document.getElementById("position" + positionInTheArray).setAttribute("stroke", "pink");
                let space = document.getElementById("position" + positionInTheArray);
                space.setAttribute("onclick", "moveMarble(" + idNumber + "," + positionInTheArray + ")");
            }
        }
        if (posibleMovementPositions.length == 1){
            console.log("Avaliable movements : " + posibleMovementPositions);
        }
    }
    return posibleMovementPositions;
}

function movementCheckEnd(idNumber){
    let positionToCheck = marbleArray[idNumber][2];
    let posibleMovementPositions = [];
    let checkPositionFor;
    let checkJumpMarble;    
    if (positionToCheck == null){
        return posibleMovementPositions;
    }
    console.log("Position to check : " + positionToCheck);

    for (let i = 0; i < avaliableMovements[positionToCheck].length; i++){
        checkPositionFor = avaliableMovements[positionToCheck][i];
        checkJumpMarble = idOfMarbleInThisPosition(avaliableMovementsEliminate[positionToCheck][i]);
        if (checkJumpMarble != null){
            if (!positionArray[checkPositionFor][0] && marbleArray[checkJumpMarble][0]){
                posibleMovementPositions.push(checkPositionFor);
                console.log("New posible movement position added : " + checkPositionFor);
            }
        }
    }
    return posibleMovementPositions;
}


function secondMovement(idNumber,posibleMovementPositions){
    console.log("SecondMovement function worked");
    console.log(marbleArray);
    console.log("Second Movement -> idNumber : " + idNumber + " || posibleMovementPositions : " + posibleMovementPositions);
    for (let i = 0; i < 15; i++){
        if (i == idNumber){
            console.log("If statement worked entered 1 condition");
            console.log("The same position or a dead marble :(");
            document.getElementById("marble" + i).setAttribute("onclick","cancelMovement(" + idNumber + ")");
        }
        else if (!posibleMovementPositions.includes(i) && marbleArray[i][0]){
            console.log("If statement worked entered 2 condition");
            document.getElementById("marble" + i).setAttribute("onclick","");
        }
        else{
            
            console.log("If statement worked entered 3 condition");
        }
    }

}

function moveMarble(idNumber, position){
    let currentPosition = marbleArray[idNumber][2];
    let marbleToMove = document.getElementById("marble" + idNumber);
    movements++;
    console.log("Move marble working");

    // marbleToMove.classList.add('spin'); For animate the movement
    //moveMarbleAnimation(idNumber, position);
    marbleToMove.setAttribute("cx",positionArray[position][1]);
    marbleToMove.setAttribute("cy",positionArray[position][2]);
    marbleArray[idNumber][2] = position;
    positionArray[position][0] = true;
    positionArray[currentPosition][0] = false;
    marbleToMove.setAttribute("stroke", "black");
    document.getElementById("guide").innerHTML = "Succesfull movement, now move another one :D";
    console.log(marbleArray);
    console.log(positionArray);
    destroyMarbleJump(currentPosition,position);
    reactivateCurrentMarbles();
    resetAllSpaces();
    updateMovements();
    checkIfPosibleMovements();
    midMovement = false;
}

// function moveMarbleAnimation(idNumber, position){
//     console.log("Inside the moveMarbleAnimation");
//     let marbleToMove = document.getElementById("marble" + idNumber);
//     let marbleToMovePosition = marbleArray[idNumber][2];
//     let intervalId = null;
//     let posXAugment = 0;
//     positionArray[marbleToMovePosition][1];
//     let posYAugment = 0;
//     positionArray[marbleToMovePosition][2];
//     clearInterval(intervalId);
//     intervalId = setInterval(movement(),5);
//     function movement(){
//         if (posXAugment + positionArray[marbleToMovePosition][1] == positionArray[position][0] && posYAugment + positionArray[marbleToMovePosition][2] == positionArray[position][1]){
//             clearInterval(intervalId);
//             marbleToMove.setAttribute("cx",positionArray[position][1]);
//             marbleToMove.setAttribute("cy",positionArray[position][2]);
//         } 
//         else{
//             console.log("");
//             posXAugment += (positionArray[position][0] - posXAugment)/100;
//             posYAugment += (positionArray[position][1] - posYAugment)/100;
//             console.log("Moving x : " + posXAugment + "Moving y : " + posYAugment);
//             marbleToMove.setAttribute("cx",positionArray[marbleToMovePosition][1] + posXAugment);
//             marbleToMove.setAttribute("cy",positionArray[marbleToMovePosition][2] + posYAugment);
//         }
//     }
// }

function destroyMarbleJump(previousPosition,position){
    console.log("In destroy marble jump");
    console.log("previousPosition :" + previousPosition + " , position : " + position);
    let marbleToEliminatePosition;
    let marbleToEliminateId;

    for (let i = 0; i < avaliableMovements[previousPosition].length; i++){
        console.log("En el loop vez : " + i);
        if (position == avaliableMovements[previousPosition][i]){
            marbleToEliminatePosition = avaliableMovementsEliminate[previousPosition][i];
            console.log("marbleToEliminatePosition : " + marbleToEliminatePosition);
        }
    }
    console.log("marbleToEliminatePosition : " + marbleToEliminatePosition);
    marbleToEliminateId = idOfMarbleInThisPosition(marbleToEliminatePosition);
    if (marbleToEliminateId != null){
        console.log("destroyMarbleJump in position " + idOfMarbleInThisPosition(marbleToEliminatePosition));
        destroyMarble(marbleToEliminateId);
    }
}

function reactivateCurrentMarbles(){
    let marble;
    for(let i = 0; i < 15; i++){
        if(marbleArray[i][0] == true){
            marble = document.getElementById("marble" + i);
            marble.setAttribute("onclick", "movementChoice(\"marble" + i + "\")");
        }
    }
}

function cancelMovement(idNumber){
    document.getElementById("marble" + idNumber).setAttribute("stroke", "black");
    resetAllSpaces();
    reactivateCurrentMarbles();
    midMovement = false;
    console.log("Movement Cancelled");
    

}

function idOfMarbleInThisPosition(position){
    for(let i = 0; i < 15; i++){
        if(marbleArray[i][2] == position){
            return i;
        }
    }
    return null;
}

function checkIfPosibleMovements(){
    let posibleMovements = [];
    let avaliableMovements = false;
    for (let i = 0; i < 15; i++){
        posibleMovements = movementCheckEnd(i);
        if(posibleMovements.length > 0){
            avaliableMovements = true
        }
    }
    if (countBoardMarbles() == 1){
        document.getElementById("guide").innerHTML = "Congratulations, you won :D"
        gameOver();
    }
    else if (!avaliableMovements){
        document.getElementById("guide").innerHTML = "You can't move any marbles :( \n Your score is : " + countBoardMarbles() + "\n Click restart game or the board to play again";
        gameOver();
    }
}

function gameOver(){
    let endRectangle = document.createElementNS(svgNS, "rect");
    endRectangle.setAttribute("id","endRectangle");
    endRectangle.setAttribute("width", 550);
    endRectangle.setAttribute("height", 550);
    endRectangle.setAttribute("x",0);
    endRectangle.setAttribute("y",0);
    endRectangle.setAttribute("stroke-width", 4);
    endRectangle.setAttribute("stroke", "black");
    endRectangle.setAttribute("fill","gray");
    endRectangle.setAttribute("onclick", "restartGame()");
    endRectangle.setAttribute("style","opacity:0.5");
    let endText = document.createElementNS(svgNS,"text");
    endText.setAttribute("id","endText");
    endText.setAttribute("x",180);
    endText.setAttribute("y",300);
    endText.setAttribute("font-size", 35);
    endText.setAttribute("stroke", "black");
    endText.setAttribute("fill","yellow");
    endText.setAttribute("onclick", "restartGame()");
    endText.innerHTML = "Game over!";
    svg.appendChild(endRectangle);
    svg.appendChild(endText);
    endGame = true;
}