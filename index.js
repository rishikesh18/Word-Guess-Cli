
//grabing other files and npm
var Word = require("./Word.js");
var inquirer = require("inquirer");
var isLetter = require('is-letter');
var underscores = require("underscore");



var correctGuessed = false;
//word list
var wordList = ["Nepal", "Everst", "Kathmandu", "Pokhara", "Tilicho", "Rara", "Mustang", "Manang", "Gorkha", "Phewa", "Rupa", "Lumbini", "Buddha", "Gandaki"];


var randomWord;
var wordGroup;

var userGuess = "";
var gussesedLetterList = "";
var gussesedLetterListArray = [];
var slotsFilledIn = 0;

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
//Starting app
function startApp() {
    console.log("This is simple hangman game in which user gueses the randomly generated word." +
"\nPress Y to play or press N to exit. You can exit anytime by pressing 'CTRl + C' in your keyboard.");
    var playGame = [
    {
       type: 'confirm',
       name: 'playGame',
       message: 'Do you want to play?',
       default: true
     }
    ];

    inquirer.prompt(playGame).then(userWantsTo => {
       if (userWantsTo.playGame){           
           console.log("Good Luck!");
           startGame();
       }

       else {			
           console.log("Good bye!");
           return;
       }
    });
}

//starting game
function startGame(){
	guessesRemaining = 10;	
	gussesedLetterList = "";
    gussesedLetterListArray = [];
    chooseRandomWord();	
}
//chosing random wod
function chooseRandomWord() {    
    randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();   
    wordGroup = new Word (randomWord);
    console.log("WORD TO GUESS HAS: "+ randomWord.length + " alphabets");    
    wordGroup.splitWord();
    wordGroup.generateLetters();
    guessLetter();
    }
//guessed letter part
function guessLetter(){    
    if (slotsFilledIn < wordGroup.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
      {
        name: "letter",
        message: "Guess a letter:",  
        //validate user inpute letter. This requires is-letter npm .    
        validate: function(value) {
            if(isLetter(value)){
              return true;
            } 
            else {
              return false;
            }
          }
      }
    ]).then(function(guess) {       
        guess.letter.toUpperCase();
        console.log("You guessed: " + guess.letter.toUpperCase());
        correctGuessed = false;  
        //if the letter is already guessed      
        if (gussesedLetterListArray.indexOf(guess.letter.toUpperCase()) > -1) {           
            console.log("Already guessed that letter. Please guess another.");           
            guessLetter();
        }    
       //is the guess letter is new or first
        else if (gussesedLetterListArray.indexOf(guess.letter.toUpperCase()) === -1) {            
            gussesedLetterList = gussesedLetterList.concat(" " + guess.letter.toUpperCase());
            gussesedLetterListArray.push(guess.letter.toUpperCase());           
           
                
            for (i=0; i < wordGroup.letters.length; i++) {                
                if (guess.letter.toUpperCase() === wordGroup.letters[i].character && wordGroup.letters[i].letterGuessedCorrectly === false) {
                   
                    wordGroup.letters[i].letterGuessedCorrectly === true;
                   
                    correctGuessed = true;
                    wordGroup.underscores[i] = guess.letter.toUpperCase();
                   
                    slotsFilledIn++
                  
                }
            }
            console.log("WORD TO GUESS HAS: "+ randomWord.length + " alphabets"); 
            wordGroup.splitWord();
            wordGroup.generateLetters();
    
         //handling for correct guess   
        if (correctGuessed) {               
                console.log('CORRECT!');               
                console.log("Letters already guessed: " + gussesedLetterList);
               // console.log("WORD TO GUESS HAS: "+ randomWord.length + " alphabets"); 
                checkWinLoss();
            }    
           //handling for incorrect guess
            else {               
                console.log('INCORRECT!');                
                guessesRemaining--;
                console.log("You have " + guessesRemaining + " guesses left.");              
                console.log("Letters already guessed: " + gussesedLetterList);
               // console.log("WORD TO GUESS HAS: "+ randomWord.length + " alphabets"); 
                checkWinLoss();
            }
        }
    });
    }
}

//win lose function
function checkWinLoss() {	
	if (guessesRemaining === 0) {
		console.log('YOU LOST. BETTER LUCK NEXT TIME.');
		console.log("The correct word was: " + randomWord);		
		losses++;		
		console.log("Wins: " + wins);
		console.log("Losses: " + losses);	
		
		playAgain();
	}

	
	else if (slotsFilledIn === wordGroup.letters.length) {
		
		console.log("YOU WON!");
		
		wins++;
		
		console.log("Wins: " + wins);
		console.log("Losses: " + losses);
		
		playAgain();
	}

	else {
	
		guessLetter("");
	}

}
//play again function
function playAgain() {
	var playGameAgain = [
	 {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){			
			gussesedLetterList = "";
			gussesedLetterListArray = [];			
			slotsFilledIn = 0;
			console.log("Good Luck!");
			startGame();
		}

		else {			
			console.log("Good bye!");
			return;
		}
	});
}
//starting app
startApp();
//startGame();


    
