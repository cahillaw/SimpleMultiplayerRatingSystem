const ADJUSTMENT_WEIGHT = 2

function calculate() {
    let inputs = document.getElementsByTagName('input')
    let players = new Map()
    let placements = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6", "Player7", "Player8"]

    for (index = 0; index <inputs.length; index++) {
        players.set("Player" + (index + 1), inputs[index].value)
    }
    console.log(inputs)
    console.log(players)

    let pointsGainedMap = adjustRatings(players, placements)

    let pointsRow = document.getElementById("pointsResultContainer")
    for (index = 0; index <inputs.length; index++) {
        let pointsGained = pointsGainedMap.get("Player" + (index + 1))
        console.log(pointsGained)

        pointsRow.deleteCell(index + 1)
        let pointsCell = pointsRow.insertCell(index + 1)
        pointsCell.innerHTML = pointsGained.toFixed(2)
    }
}


function adjustRatings(players, playerPos) {
    let pointsGained = new Map()

    for (var i = 0; i< playerPos.length; i++) {
        let totalRating = 0
        let iPlayer = playerPos[i]

        for(var j = 0; j < playerPos.length; j++) {
            let jPlayer = playerPos[j]

            if (i == j) { continue }
    
            let iPlayerRating = players.get(iPlayer)
            let jPlayerRating = players.get(jPlayer)
    
            if (i < j) {
                totalRating += calcCustomPositivePoints(jPlayerRating - iPlayerRating)
            } else {
                totalRating += calcCustomNegativePoints(jPlayerRating - iPlayerRating)
            }
        }

        pointsGained.set(iPlayer, totalRating)
    }

    return pointsGained
}

function calcCustomPositivePoints(difference) {
    let differenceAdjustment = ADJUSTMENT_WEIGHT * difference / 1000;

    return 10 + differenceAdjustment;
}

function calcCustomNegativePoints(difference) {
    let differenceAdjustment = ADJUSTMENT_WEIGHT * difference / 1000;
    
    return -10 + differenceAdjustment;
}