const options = ["R", "L", "U", "D", "F", "B"];
const moveTypes = ["", "'", "2"];
const moveTypes2 = [...moveTypes];

const randomFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const scramble = (cubeSize, scrambleLength) => {
    let scramble = [];
    let lastMove = "";

    if (cubeSize == 4 || cubeSize == 5) moveTypes.push("Wide");
    if (cubeSize > 5) {
        let moveTypeArr = [];
        
        for (let i = Math.floor(cubeSize / 2); i > 3; i--) {
            moveTypeArr.push(i);
        }

        moveTypes.push(moveTypeArr);
    }

    for (let i = 0; i < scrambleLength; i++) {
        let newOptions = [...options];

        let index = options.indexOf(lastMove);
        if (index > -1) newOptions.splice(index, 1);

        lastMove = randomFromArr(newOptions);

        let moveType = randomFromArr(moveTypes);
        let nextMove;

        if (Array.isArray(moveType)) {
            nextMove = randomFromArr(moveType) + lastMove + randomFromArr(moveTypes2);
        } else if (moveType == "Wide") {
            nextMove = lastMove.toLowerCase();
        } else {
            nextMove = lastMove + moveType;
        }

        scramble.push(nextMove);
    }

    return scramble.join(" ");
}