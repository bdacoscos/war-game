$(function() {
/*----- constants -----*/

// on click, deal cards, determine winner or war, update vars, declare winner or war
  // if winner: on next click, add all played cards to winner deck, deal cards
  // if war: draw 4 cards, determine winner or war, update vars, declare winner or war
    // if winner: on next click, add all played cards to winner deck, deal cards
    // if war: draw 4 cards, determine winner or war, update vars, declare winner or war
      // ...

/*----- app's state (variables) -----*/
var deck = []; // created deck
var p1Cards = []; // deck 1
var p2Cards = []; // deck 2
var p1Played = []; // player 1 card in play
var p2Played = []; // player 2 card in play
var winner;


/*----- cached element references -----*/


/*----- event listeners -----*/

// event listener on PLAY button
// event listener on DEAL button
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
    p1Cards.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
  }

  // SPLIT THE DECK
  p2Cards = p1Cards.splice(0, 26);
  render();
}


// function checkForWinner() {
// }

function render() {
  console.log('rendering...')
  $('#deckOne').addClass('card').addClass(p1Cards[0].css);
  $('#deckTwo').addClass('card').addClass(p2Cards[0].css);

}

init();
});