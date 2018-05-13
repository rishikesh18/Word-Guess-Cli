//grabing from letter.js file
var Letter = require("./Letter");

var Word = function(myWord) {	
	this.myWord = myWord;	
	this.letters = [];	
	this.underscores = [""];
	this.splitWord = function() {
		this.letters = this.myWord.split("");	
		numberUnderscoresNeeded = this.letters.length;
		let newString=[];
		for(let i=0;i<numberUnderscoresNeeded;i++){
			newString[i] ="_";
		}
		for(let i=0 ;i<this.letters.length;i++){
			for(let j=0;j<this.underscores.length;j++){
				if(this.letters[i]==this.underscores[j]){
					newString[i]=this.letters[i];
				}
			}
		}
		console.log(newString.join(" "));
	}
	this.generateLetters = function() {
			
		for (i=0; i < this.letters.length; i++){
			this.letters[i] = new Letter (this.letters[i]);			
			this.letters[i].showCharacter();
		}
	}
}


module.exports = Word;

