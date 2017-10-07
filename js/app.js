$(function() {
/*----- constants -----*/

/*----- app's state (variables) -----*/
var deck = []; // created deck
var deckOne = []; // deck 1
var deckTwo = []; // deck 2
var playOne = []; // player 1 card in play
var playTwo = []; // player 2 card in play
var getWinner;

/*----- cached element references -----*/


/*----- event listeners -----*/

// event listener on NEW GAME button
// $('button#reset').on('click', init);

// event listener on DEAL button
$('button#init').on('click', init);
$('button#deal-btn').on('click', deal);

// event listener on WAR button


/*----- functions -----*/

function init() {
  console.log('init is running');
  buildDeck();
  shuffle();
}

function buildDeck() {
  console.log('buildDeck is running');
  var suits = ['d', 'c', 'h', 's'];
  var faces = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
  var lookup = {'02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
  suits.forEach(function(suit) {
    faces.forEach(function(face) {
      var card = {
        css: suit + face,
        value: lookup[face] 
      };
      deck.push(card);
    })
  })
}

function shuffle() {
  console.log('shuffling...');
  while (deck.length) {
    deckOne.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
  }
  deckTwo = deckOne.splice(0, 26);
  console.log('decks are split!');
}

function deal() {

  if ($('#playOne').hasClass('card')) { $('#playOne').removeClass(playOne.css); }
  playOne = deckOne.shift();
  $('#playOne').addClass('card').addClass(playOne.css);
  console.log(playOne);

  if ($('#playTwo').hasClass('card')) { $('#playTwo').removeClass(playTwo.css); }
  playTwo = deckTwo.shift();
  $('#playTwo').addClass('card').addClass(playTwo.css);
  console.log(playTwo);
  
  render();
}


// function getWinner() {
// }

function render() {
  console.log('rendering...');
  
  
  
}  







// init();
});