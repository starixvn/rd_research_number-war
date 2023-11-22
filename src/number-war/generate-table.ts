import { outputFileSync  } from 'fs-extra';
import {getPossibilitiesForSecondBall, getPossibilitiesForThirdBall} from "./odd-calculation"



export function generatePossibilitiesTableForSecondDrawn(type: string): string {
    let data = "";
    for (let i = 10; i < 20; i++) {
        for (let j = 10; j < 20; j++) {
            let result = getPossibilitiesForSecondBall(i, j);
            data += result[type] + ","
        }
        data += "\n";
    }
    return data + "\n";
}

export function generatePossibilitiesTableForThirdDrawn(type: string): string {
    let data = "";
    for (let i = 1; i < 11; i++) {
        for (let p1 = 0; p1 <= Math.floor(i/2); p1++) {
            let p2 = i -p1;
            for (let j = 1; j < 11; j++) {
                for (let b1 = 0; b1 <= Math.floor(j/2); b1++) {
                    let b2 = j -b1;
                    let result = getPossibilitiesForThirdBall(p1+10, b1+10, p2+20, b2+20);
                    data += result[type] + ",";
                }
            }
            data += "\n";
        }
    }
    return data + "\n";
}

export function generatePossibilitiesTable(): void {
    let data = "Second drawn tie table:\n";
    data+= generatePossibilitiesTableForSecondDrawn("tiePossibilities");
    data+= "Second drawn player win table:\n";
    data+= generatePossibilitiesTableForSecondDrawn("playerWinPossibilities");
    data+= "Second drawn banker win table:\n";
    data+= generatePossibilitiesTableForSecondDrawn("bankerWinPossibilities");

    data+= "Third drawn tie table:\n";
    data+= generatePossibilitiesTableForThirdDrawn("tiePossibilities");
    data+= "Third drawn player win table:\n";
    data+= generatePossibilitiesTableForThirdDrawn("playerWinPossibilities");
    data+= "Third drawn banker win table:\n";
    data+= generatePossibilitiesTableForThirdDrawn("bankerWinPossibilities");

    outputFileSync("possibilities.csv", data);
}