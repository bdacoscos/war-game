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
$('#play').on('click', init);
$('#deal-btn').on('click', deal);
$('#new-game').on('click', init);
$('#war-btn').on('click', doWar);


/*----- functions -----*/
function init() {
  deckOne = [];
  playOne = [];
  deckTwo = [];
  playTwo = [];
  winner = null;
  inWar = false;
  $('#play').hide();
  $('#deal-btn').show();
  $('#new-game').show();
  $msg.hide();
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
}

function shuffle() {
  while (newDeck.length) {
    deckOne.push(newDeck.splice(Math.floor(Math.random() * newDeck.length), 1)[0]);
  }
  deckTwo = deckOne.splice(0, 26);
}

function deal() {
  $msg.show();
  playOne = [];
  playTwo = [];
  playOne.unshift(deckOne.shift());
  playTwo.unshift(deckTwo.shift());
  getWinner();
}

function checkForWinner() {
  if (deckOne.length === 0 || deckTwo.length === 0) { declareWinner(); };
}

function getWinner() {
  if (playOne[0].value !== playTwo[0].value) {
    // there is a winner, no war
    inWar = false;
    var winnerDeck = playOne[0].value > playTwo[0].value ? deckOne : deckTwo;
    winnerDeck.push(...playOne, ...playTwo);
    winner = winnerDeck === deckOne ? `Player 1` : `Player 2`;
  } else {
    // it's war!
    inWar = true;
  }
  render();
}
    
function doWar() {
  // if either deck less than 4, doWar for x-amount of cards
  var numToDeal = Math.min(deckOne.length, deckTwo.length,  4);
  for (var i = 0; i < numToDeal; i++) {
      playTwo.unshift(deckTwo.shift());
      playOne.unshift(deckOne.shift());
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
  $msg.html(inWar ? `It's War!` : `${winner} wins!`);
  checkForWinner();
}  

function declareWinner() {
  $msg.html(`${winner} Wins War!!`);
  $('#deal-btn').hide();
}

// init();
});