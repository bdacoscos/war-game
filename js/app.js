$(function() {
/*----- constants -----*/

/*----- app's state (variables) -----*/
var deck = []; // created deck
var deckOne = []; // deck 1
var deckTwo = []; // deck 2
var playOne = []; // player 1 card in play
var playTwo = []; // player 2 card in play
var stageOne = []; // player 1's staged cards
var stageTwo = []; // player 2's staged cards

/*----- cached element references -----*/
var $msg = $('#msg');
var $p1Counter = $('#p1Counter');
var $p2Counter = $('#p2Counter');

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
  $('#playOne').removeClass('back');
  $('#playTwo').removeClass('back');

  if ($('#playOne').hasClass('card')) { $('#playOne').removeClass(playOne.css); }
  playOne = deckOne.shift();
  $('#playOne').addClass('card').addClass(playOne.css);

  if ($('#playTwo').hasClass('card')) { $('#playTwo').removeClass(playTwo.css); }
  playTwo = deckTwo.shift();
  $('#playTwo').addClass('card').addClass(playTwo.css);
  
  getWinner();
}

function getWinner() {
  console.log(playOne);
  console.log(playTwo);
  
  if (playOne.value > playTwo.value) {
    $msg.html(`Player 1 Wins!`);
    deckOne.push(playOne);
    deckOne.push(playTwo);
    console.log(deckOne);
    console.log(`pushed cards into deckOne`);
  } else if (playTwo.value > playOne.value) {
    $msg.html(`Player 2 Wins!`);
    deckTwo.push(playOne);
    deckTwo.push(playTwo);
    console.log(deckTwo);
    console.log(`pushed cards into deckTwo`);
  } else if (playOne.value === playTwo.value) {
    $msg.html(`...It's WAR!!`);
    // war();
  }

  render();
}

// function war() {
//   console.log(`war function listening`);
//   // push card in playOne and playTwo into stageOne and stageTwo
//   stageOne.push(playOne);
//   stageTwo.push(playTwo);
//   // draw three cards 
//   stageOne = deckOne.splice(0, 3);
//   console.log(stageOne);
//   stageTwo = deckTwo.splice(0, 3);
//   console.log(stageTwo);
// }

function render() {
  console.log('rendering...');
  $p1Counter.html(`Player 1 cards: ${deckOne.length}`);
  $p2Counter.html(`Player 2 cards: ${deckTwo.length}`);

}  



// init();
});