$(function() {

/*----- constants -----*/




/*----- app's state (variables) -----*/
var deck = [];
var winner;
var playerOne;
var playerTwo;
var shuffled = [];


/*----- cached element references -----*/




/*----- event listeners -----*/




/*----- functions -----*/

function init() {
  console.log('init is running');
  buildDeck();
  shuffle();


}

function buildDeck() {
  console.log('buildDeck is running');
  var suits = ['d', 'c', 'h', 's'];
  var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  var lookup = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};

  suits.forEach(function(suit) {
    faces.forEach(function(face) {
      var card = {
        // css: face + suit,
        value: lookup[face] 
      };
      deck.push(card);
    })
  })
}

function shuffle() {
  console.log('shuffling...');
  while (deck.length) {
    shuffled.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
  }
  console.log(shuffled);
}

// function checkForWinner() {


// }


// function render() {


// }

init();
// render();

});