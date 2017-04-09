// $(document).ready(function(){


var cardArray = [];

if (JSON.parse(localStorage.getItem("cardArray")) === null) {
	cardArray = [];
} else {
	cardArray = JSON.parse(localStorage.getItem("cardArray", function(key, value){
		if (key == "patrial"){
			return 
		}
	} ));
}



console.log(cardArray);

var cardType = 1;



$("#cardViewFront").on("click", function() {
	$(".flipper").css("transform", "rotateY(0deg)");
});

$("#cardViewBack").on("click", function() {
	$(".flipper").css("transform", "rotateY(180deg)");
});

$(document).on("click", ".cardBtn", function(){
	var arrayLocation = $(this).attr("id");
	var cardObj = cardArray[arrayLocation];
	console.log(cardObj);

	if (cardObj.type === "basic"){
		$("#cardFrontText").html(cardObj.front);
		$("#cardBackText").html(cardObj.back);
	} else if (cardObj.type === "cloze") {
		cardObj.prototype.partial = function(){
			var partialText = this.fullText.replace(this.cloze, "...");
			return partialText;
		}
		$("#cardFrontText").html(cardObj.partial());
		$("#cardBackText").html(cardObj.cloze);
	} else {
		console.log("error, there was a problem with the card obj.")
	}
});

$("#cardTypeDef").on("click", function(){
	cardType = 1;
	$("#labelFront").html("Term");
	$("#cardFront").attr("placeholder", "Front of Card (Ex. George Washington)");
	$("#labelBack").html("Definition");
	$("#cardBack").attr("placeholder", "Back of Card (Ex. Was the first president of the U.S.A.)");
	$("#createBtn").html("Create Definition Flash Card");
});

$("#cardTypeCloze").on("click", function(){
	cardType = 2;
	$("#labelFront").html("Cloze");
	$("#cardFront").attr("placeholder", "Cloze Word (Ex. George Washington)");
	$("#labelBack").html("Full Text");
	$("#cardBack").attr("placeholder", "Full Text (Ex. George Washington was the first president of the U.S.A.)");
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
		localStorage.setItem("cardArray", JSON.stringify(cardArray));
	} else if (cardType === 2) {
		var card = new ClozeCard(cardTitle, cardFront, cardBack);
		cardArray.push(card);
		console.log(cardArray);
		localStorage.setItem("cardArray", JSON.stringify(cardArray));
	} else {
		console.log("Error!");
	};	
});




function fillYourCardsNav(){
	for (var i=0; i<cardArray.length; i++) {
		$("#yourCardsNav").append('<button type="button" class="btn btn-default cardBtn" id="'+i+'">'+cardArray[i].title+'</button>');
		console.log("appended");
	}
}






// Basic flash card constructor
function BasicCard(title,front, back) {
	this.title = title;
	this.front = front;
	this.back = back;
	this.type = "basic";
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
	this.type = "cloze";
	this.partial = function() {
		var partialText = this.fullText.replace(this.cloze, "...");
		return partialText;
	};
};

// console.log("Broken");

var ben = new ClozeCard("ben", "Ben Franklin", "Ben Franklin was Great!");

console.log(ben.cloze);
console.log(ben.fullText);
console.log(ben.partial());


// ClozeCard should have a property or method that contains or returns only the cloze-deleted portion of the text.

// ClozeCard should have a property or method that contains or returns only the partial text.

// ClozeCard should have a property or method that contains or returns only the full text.

// ClozeCard should throw or log an error when the cloze deletion does not appear in the input text



// End of .ready()
// });

fillYourCardsNav();