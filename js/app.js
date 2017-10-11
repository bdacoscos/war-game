$(function() {
/*----- constants -----*/

/*----- app's state (variables) -----*/
var newDeck = []; // created deck
var deckOne = []; // deck 1
var deckTwo = []; // deck 2
var playOne = []; // player 1 card in play
var playTwo = []; // player 2 card in play
var winner;
var inWar;


/*----- cached element references -----*/
var $msg = $('#msg');
var $p1Counter = $('#p1Counter');
var $p2Counter = $('#p2Counter');


/*----- event listeners -----*/
$('#init').on('click', init);
$('#deal-btn').on('click', deal);
$('#war-btn').on('click', doWar);


/*----- functions -----*/
function init() {
  winner = null;
  inWar = false;
  buildDeck();
  shuffle();
  render();
}

function buildDeck() {
  var suits = ['d', 'c', 'h', 's'];
  var faces = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
  var lookup = {'02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
  suits.forEach(function(suit) {
    faces.forEach(function(face) {
      var card = {
        css: suit + face,
        value: lookup[face] 
      };
      newDeck.push(card);
    })
  })
  console.log(newDeck);
}

function shuffle() {
  while (newDeck.length) {
    deckOne.push(newDeck.splice(Math.floor(Math.random() * newDeck.length), 1)[0]);
  }
  deckTwo = deckOne.splice(0, 26);
}

function deal() {
  playOne = [];
  playTwo = [];

  playOne.unshift(deckOne.shift());
  playTwo.unshift(deckTwo.shift());
  getWinner();
}

function getWinner() {
  // while there are cards in deckOne and deckTwo, continue drawing cards

  if (playOne[0].value !== playTwo[0].value) {
    // there is a winner, no war
    inWar = false;
    var winnerDeck = playOne[0].value > playTwo[0].value ? deckOne : deckTwo;
    winnerDeck.push(...playOne, ...playTwo);
  } else {
    // it's war!
    inWar = true;
  }
  render();
}
    
function doWar() {
  // draw 4 cards
  for (var i = 0; i < 4; i++) {
    playOne.unshift(deckOne.shift());
    playTwo.unshift(deckTwo.shift());
  }
  getWinner();
}
    
function render() {
  if (playOne[0]) {
    $('#playOne').removeClass();
    $('#playOne').addClass(`xlarge card ${playOne[0].css}`);
    $('#playTwo').removeClass();
    $('#playTwo').addClass(`xlarge card ${playTwo[0].css}`);
  }
  inWar ? $('#deal-btn').hide() : $('#war-btn').hide();
  inWar ? $('#war-btn').show() : $('#deal-btn').show();
  $p1Counter.html(`Player 1 cards: ${deckOne.length}`);
  $p2Counter.html(`Player 2 cards: ${deckTwo.length}`);
  $msg.html(inWar ? "It's War!" : "Battle!");
}  

});