import * as readlinePromises from 'node:readline/promises';
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });

async function askQuestion(question) {
    return await rl.question(question);
}

import { ANSI } from './ansi.mjs';
import { HANGMAN_UI } from './graphics.mjs';

const arrayOfWords = ["cat", "dog", "sun", "run", "cup", "bat", "pen", "map", "car", "box",
    "red", "top", "net", "sit", "hat", "bee", "wet", "key", "bus", "log",
    "bag", "pot", "pin", "fit", "hit", "lip", "tap", "bed", "jet", "fun",
    "bit", "fog", "cut", "jar", "bar", "dot", "hop", "can", "jam", "pad",
    "rug", "zip", "tag", "pie", "toy", "bun", "rod", "fix", "oak", "fox"]; //chat gpt made the array

let randomlyPickedAnswer = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
let correctWord = randomlyPickedAnswer.toLowerCase();
let numberOfCharInWord = correctWord.length;
let guessedWord = "".padStart(correctWord.length, "_"); 
let wordDisplay = "";
let isGameOver = false;
let wasGuessCorrect = false;

const PLAYER_MESSAGES = {
WIN: "Congratulation, you guessed the right word!",
GAME_END: "Game Over",
INSERT_CHAR_OR_WORD: "Guess a char or the word : ",
WRONG_GUESSES: "Wrong guesses : ",
REPLAY: "Want to replay? yes or no : ",
REPLAY_ANSWER_POSITIVE: "yes",
REPLAY_ANSWER_NEGATIVE: "no",
CORRECT_WORD: "The correct word was : ",
STATISTICS: "Statistics: ",
WRONG_GUESS_TOTAL: "Total wrong guesses: ",
GAMES_WON: "Total games won: ",
QUIT_PROGRAM: "Enter any key to quit program: ",
TOTAL_ROUNDS_PLAYED: "Total rounds played :",
};

const CHAR = {
SPACE: " ",
LINES: "_",
EMPTY: ""
};


let wantToReplay = true
let wrongGuessesTotal = 0;
let gamesWon = 0;
let totalRoundsPlayed = 0;

while (wantToReplay == true) {
    let wrongGuesses = [];
    let allWrongGuesses = [];
    let usedRightAnswers = [];
   
    function drawWordDisplay() {

        wordDisplay = CHAR.EMPTY;
    
        for (let i = 0; i < numberOfCharInWord; i++) {
    
            if (guessedWord[i] != CHAR.LINES) {
                wordDisplay += ANSI.COLOR.GREEN;
            }
            wordDisplay = wordDisplay + guessedWord[i] + CHAR.SPACE;
            wordDisplay += ANSI.RESET;
        }
    
        return wordDisplay;
    }
    
    function drawList(list, color) {
        let output = color;
        for (let i = 0; i < list.length; i++) {
            output += list[i] + CHAR.SPACE;
        }
    
        return output + ANSI.RESET;
    }
    randomlyPickedAnswer = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
                correctWord = randomlyPickedAnswer.toLowerCase();
                numberOfCharInWord = correctWord.length;
                guessedWord = CHAR.EMPTY.padStart(correctWord.length, CHAR.LINES);
                wordDisplay = CHAR.EMPTY;
                isGameOver = false;
                wasGuessCorrect = false;    
                
               

    while (isGameOver == false) {
    console.log(ANSI.CLEAR_SCREEN);
    console.log(drawWordDisplay());
    console.log(drawList(wrongGuesses, ANSI.COLOR.RED));
    console.log(HANGMAN_UI[wrongGuesses.length + allWrongGuesses.length]);

    const answer = (await askQuestion(PLAYER_MESSAGES.INSERT_CHAR_OR_WORD)).toLowerCase();

    
    if (answer == correctWord) {
        isGameOver = true;
        wasGuessCorrect = true;
        
       
    }  
    else if (usedRightAnswers.includes(answer)){
        allWrongGuesses.push(answer);
        wrongGuessesTotal++
    }
    else if (playerGuessed(answer)) {
        let org = guessedWord;
        guessedWord = CHAR.EMPTY;

        let isCorrect = false;
        for (let i = 0; i < correctWord.length; i++) {
            if (correctWord[i] == answer) {
                guessedWord += answer;
                isCorrect = true;
                 usedRightAnswers.push(answer);
            } else {
                guessedWord += org[i];
            }
        }
        if (wrongGuesses.includes(answer)){
            allWrongGuesses.push(answer);
            wrongGuessesTotal++
        }
        
        else if (isCorrect == false) {
            
            wrongGuesses.push(answer);
            wrongGuessesTotal++;
        }
       
        
        else if (guessedWord == correctWord) {
            isGameOver = true;
            wasGuessCorrect = true;
            gamesWon++;
        } 
    }

    if (wrongGuesses.length + allWrongGuesses.length == HANGMAN_UI.length - 1) {
        isGameOver = true;
    }
    }
    console.log(ANSI.CLEAR_SCREEN);
    console.log(drawWordDisplay());
    console.log(drawList(wrongGuesses, ANSI.COLOR.RED));
    console.log(HANGMAN_UI[wrongGuesses.length + allWrongGuesses.length]);

    if (wasGuessCorrect) {
        console.log(ANSI.COLOR.YELLOW + PLAYER_MESSAGES.WIN + ANSI.RESET);

    }

    console.log(PLAYER_MESSAGES.CORRECT_WORD + ANSI.COLOR.GREEN + correctWord + ANSI.RESET);
    console.log(PLAYER_MESSAGES.GAME_END);



    if (isGameOver = true) {
        console.log
        totalRoundsPlayed++
    }

    const answer = (await askQuestion(PLAYER_MESSAGES.REPLAY)).toLowerCase();

    if (answer == PLAYER_MESSAGES.REPLAY_ANSWER_POSITIVE) {
        wantToReplay = true;
    }
    else if (answer == PLAYER_MESSAGES.REPLAY_ANSWER_NEGATIVE) {
        wantToReplay = false;
    }
    else {
        wantToReplay = false;
    }

function playerGuessed(answer) {
    return answer.length;
}
}
console.log(ANSI.CLEAR_SCREEN);

console.log(PLAYER_MESSAGES.STATISTICS)
console.log(PLAYER_MESSAGES.GAMES_WON + ANSI.COLOR.GREEN + gamesWon + ANSI.RESET)
console.log(PLAYER_MESSAGES.TOTAL_ROUNDS_PLAYED + ANSI.COLOR.YELLOW + totalRoundsPlayed + ANSI.RESET)
console.log(PLAYER_MESSAGES.WRONG_GUESS_TOTAL + ANSI.COLOR.RED + wrongGuessesTotal + ANSI.RESET);
console.log(CHAR.EMPTY);
const answer = (await askQuestion(PLAYER_MESSAGES.QUIT_PROGRAM));
if (answer) {
    console.log(ANSI.CLEAR_SCREEN);
    process.exit();
}

