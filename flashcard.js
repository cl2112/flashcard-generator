$(document).ready(function(){


var cardArray = [];

var cardType = 1;




$("#cardTypeDef").on("click", function(){
	cardType = 1;
	$("#labelFront").html("Term");
	$("#labelBack").html("Definition");
	$("#createBtn").html("Create Definition Flash Card");
});

$("#cardTypeCloze").on("click", function(){
	cardType = 2;
	$("#labelFront").html("Cloze");
	$("#labelBack").html("Full Text");
	$("#createBtn").html("Create Cloze Flash Card");
});


$("#createBtn").on("click", function () {
	var cardTitle = $("#cardTitle").val().trim();
	var cardFront = $("#cardFront").val().trim();
	var cardBack = $("#cardBack").val().trim();
	console.log(cardTitle, cardFront, cardBack);

	if (cardType === 1) {
		var card = new BasicCard(cardTitle, cardFront, cardBack);
		cardArray.push(card);
		console.log(cardArray);
	} else if (cardType === 2) {
		var card = new ClozeCard(cardTitle, cardFront, cardBack);
		cardArray.push(card);
		console.log(cardArray);
	} else {
		console.log("Error!");
	};	
});






// Basic flash card constructor
function BasicCard(title,front, back) {
	this.title = title;
	this.front = front;
	this.back = back;
};


// var george = new BasicCard("President ONE?", "George!");

// console.log(george.front);
// console.log(george.back);




// Cloze flash card constructor
function ClozeCard(title, cloze, text) {
	if (text.indexOf(cloze) === -1) {
		console.log("ERROR - The CLOZE text is not in the full text.");
		return "ERROR";
	};
	this.title = title;
	this.cloze = cloze;
	this.fullText = text;
	this.partial = function() {
		var partialText = this.fullText.replace(this.cloze, "...");
		return partialText;
	};
};

// console.log("Broken");

// var ben = new ClozeCard("Ben Franklin was Great!", "Ben Franklin");

// console.log(ben.cloze);
// console.log(ben.fullText);
// console.log(ben.partial());


// ClozeCard should have a property or method that contains or returns only the cloze-deleted portion of the text.

// ClozeCard should have a property or method that contains or returns only the partial text.

// ClozeCard should have a property or method that contains or returns only the full text.

// ClozeCard should throw or log an error when the cloze deletion does not appear in the input text



// End of .ready()
});

