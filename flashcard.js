var input = process.argv[2];



function BasicCard(front, back) {
	this.front = front;
	this.back = back;
};


var george = new BasicCard("President ONE?", "George!");

console.log(george.front);
console.log(george.back);




function ClozeCard(text, cloze) {
	if (text.indexOf(cloze) === -1) {
		console.log("ERROR - The CLOZE text is not in the full text.");
		return "ERROR";
	};
	this.cloze = cloze;
	this.fullText = text;
	this.partial = function() {
		var partialText = this.fullText.replace(this.cloze, "...");
		return partialText;
	};
};

// console.log("Broken");

var ben = new ClozeCard("Ben Franklin was Great!", "Ben Franklin");

console.log(ben.cloze);
console.log(ben.fullText);
console.log(ben.partial());


// ClozeCard should have a property or method that contains or returns only the cloze-deleted portion of the text.

// ClozeCard should have a property or method that contains or returns only the partial text.

// ClozeCard should have a property or method that contains or returns only the full text.

// ClozeCard should throw or log an error when the cloze deletion does not appear in the input text