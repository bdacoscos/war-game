$(function() {
/*----- constants -----*/

/*----- app's state (variables) -----*/
var newDeck = []; // created deck
var deckOne = []; // deck 1
var deckTwo = []; // deck 2
var playOne = []; // player 1 card in play
var playTwo = []; // player 2 card in play


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
$('button#war-btn').on('click', war);


/*----- functions -----*/
function init() {
  buildDeck();
  shuffle();
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
  console.log('decks are split!');
  render();
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
  if (playOne.value > playTwo.value) {
    deckOne.push(playOne);
    deckOne.push(playTwo);
    console.log(`pushed cards into deckOne`);
    $msg.html(`Player 1 Wins!`);
  } else if (playTwo.value > playOne.value) {
    deckTwo.push(playOne);
    deckTwo.push(playTwo);
    console.log(`pushed cards into deckTwo`);
    $msg.html(`Player 2 Wins!`);
  } else if (playOne.value === playTwo.value) {
    $msg.html(`...It's WAR!!`);
    war();
  }

  render();
}

function war() {
  console.log(`war function listening`);
  
  // while war condition true (playOne[0].value === playTwo[0].value):
    // draw 4 cards, shift into playOne and playTwo
    // if playOne[0].value > playTwo[0].value --> {push all cards into deckOne}
    // if playTwo[0].value > playOne[0].value --> {push all cards into deckTwo}


  stageOne = deckOne.splice(0, 3);
  console.log(stageOne);

  stageTwo = deckTwo.splice(0, 3);
  console.log(stageTwo);
}

function render() {
  console.log('rendering...');
  $p1Counter.html(`Player 1 cards: ${deckOne.length}`);
  $p2Counter.html(`Player 2 cards: ${deckTwo.length}`);

}  



// init();
});