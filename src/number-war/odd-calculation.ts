interface PossibilitiesResult {
    tiePossibilities: number,
    playerWinPossibilities: number,
    bankerWinPossibilities: number
}

interface OddsResult {
    tieOdds: number,
    playerWinOdds: number,
    bankerWinOdds: number
}

export function getPossibilitiesForSecondBall(playerFirstBall: number, bankerFirstBall: number): PossibilitiesResult {
    let tie = 0;
    let playerWin = 0;
    let bankerWin = 0;

    for (let i = 1; i <= 75; i++) {
        for (let j = 1; j <= 75; j++) {
            if (i != playerFirstBall && j != bankerFirstBall) {
                let playerSum = (playerFirstBall + i) % 10;
                let bankerSum = (bankerFirstBall + j) % 10;
                if (playerSum == bankerSum) {
                    tie += 1;
                }
                else if (playerSum < bankerSum) {
                    bankerWin += 1;
                }
                else if (playerSum > bankerSum) {
                    playerWin += 1;
                }
            }
        }
    }

    let result = {
        tiePossibilities: tie,
        playerWinPossibilities: playerWin,
        bankerWinPossibilities: bankerWin
    }

    return result;
}

export function getPossibilitiesForThirdBall(playerFirstBall: number, bankerFirstBall: number, playerSecondBall: number, bankerSecondBall: number): PossibilitiesResult {
    let tie = 0;
    let playerWin = 0;
    let bankerWin = 0;

    for (let i = 1; i <= 75; i++) {
        for (let j = 1; j <= 75; j++) {
            if (i != playerFirstBall && j != bankerFirstBall && i != playerSecondBall && j != bankerSecondBall) {
                let playerSum = (playerFirstBall + playerSecondBall + i) % 10;
                let bankerSum = (bankerFirstBall + bankerSecondBall + j) % 10;
                if (playerSum == bankerSum) {
                    tie += 1;
                }
                else if (playerSum < bankerSum) {
                    bankerWin += 1;
                }
                else if (playerSum > bankerSum) {
                    playerWin += 1;
                }
            }
        }
    }

    let result = {
        tiePossibilities: tie,
        playerWinPossibilities: playerWin,
        bankerWinPossibilities: bankerWin
    }

    return result;
}

export function getOddsForSecondBall(playerFirstBall: number, bankerFirstBall: number, margin: number): OddsResult {
    let possibilities = getPossibilitiesForSecondBall(playerFirstBall,bankerFirstBall);
    const totalPossibilities = 74*74;

    let result = {
        tieOdds: totalPossibilities / possibilities.tiePossibilities * (1 -margin),
        playerWinOdds: totalPossibilities / possibilities.playerWinPossibilities * (1 -margin),
        bankerWinOdds: totalPossibilities / possibilities.bankerWinPossibilities * (1 -margin)
    }

    return result;
}

export function getOddsForThirdBall(playerFirstBall: number, bankerFirstBall: number, playerSecondBall: number, bankerSecondBall: number, margin: number): OddsResult {
    let possibilities = getPossibilitiesForThirdBall(playerFirstBall,bankerFirstBall,playerSecondBall,bankerSecondBall);
    const totalPossibilities = 73*73;

    let result = {
        tieOdds: totalPossibilities / possibilities.tiePossibilities * (1 -margin),
        playerWinOdds: totalPossibilities / possibilities.playerWinPossibilities * (1 -margin),
        bankerWinOdds: totalPossibilities / possibilities.bankerWinPossibilities * (1 -margin)
    }

    return result;
}

