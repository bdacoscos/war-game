$(function () {
  /*----- app's state (variables) -----*/
  var newDeck = [];
  var deckOne = [];
  var deckTwo = [];
  var playOne = [];
  var playTwo = [];
  var inPlay;
  var winner;
  var inWar;


  /*----- cached element references -----*/
  var $instructions = $('#instructions');
  var $teamCats = $('#team-cats');
  var $teamDogs = $('#team-dogs');
  var $deal = $('#deal-btn');
  var $newgame = $('#new-game');
  var $warbtn = $('#war-btn');
  var $msg = $('#msg');
  var $p1Counter = $('#p1Counter');
  var $p2Counter = $('#p2Counter');


  /*----- event listeners -----*/
  $('#team-cats, #team-dogs').on('click', init);
  $deal.on('click', deal);
  $newgame.on('click', init);
  $warbtn.on('click', doWar);


  /*----- functions -----*/
  function init() {
    inPlay = true;
    deckOne = [];
    playOne = [];
    deckTwo = [];
    playTwo = [];
    winner = null;
    inWar = false;
    $instructions.hide();
    $teamCats.hide();
    $teamDogs.hide();
    $deal.show();
    $newgame.show();
    $msg.hide();
    buildDeck();
    render();
  }

  function buildDeck() {
    var suits = ['d', 'c', 'h', 's'];
    var faces = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
    var lookup = {'02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
    suits.forEach(function (suit) {
      faces.forEach(function (face) {
        var card = {
          css: suit + face,
          value: lookup[face]
        };
        newDeck.push(card);
      })
    })
    deckOne = newDeck.splice(0, 26);
    deckTwo = newDeck.splice(0, 26);
    shuffle();
  }

  function shuffle() {
    for (var i = 0; i < deckOne.length; i++) {
      deckOne.push(deckOne.splice(Math.floor(Math.random() * deckOne.length), 1)[0]);
    }
    for (var j = 0; j < deckTwo.length; j++) {
      deckTwo.push(deckTwo.splice(Math.floor(Math.random() * deckTwo.length), 1)[0]);
    }
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
    if (deckOne.length === 0 || deckTwo.length === 0) {
      declareWinner();
    };
  }

  function getWinner() {
    if (playOne[0].value !== playTwo[0].value) {
      inWar = false;
      var winnerDeck = playOne[0].value > playTwo[0].value ? deckOne : deckTwo;
      winnerDeck.push(...playOne, ...playTwo);
      winner = winnerDeck === deckOne ? `Cats` : `Dogs`;
    } else {
      inWar = true;
      shuffle();
    }
    render();
  }

  function doWar() {
    var numToDeal = Math.min(deckOne.length, deckTwo.length, 4);
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
      $('#dog').removeClass('animate wiggle');
      $('#cat').removeClass('animate wiggle');
      $('#playTwo').removeClass();
      $('#playTwo').addClass(`xlarge card ${playTwo[0].css}`);
    }
    inPlay? $('#war-zone').show() : $('#war-zone').hide();
    inWar ? $deal.hide() : $warbtn.hide();
    if (inWar) {
      $warbtn.show();
      $warbtn.attr("disabled", "");
      setTimeout(function(){
        $warbtn.removeAttr("disabled", "");
      }, 750);
    } else {
      $deal.show();
    }
    $p1Counter.html(`Team Cats: ${deckOne.length}`);
    $p2Counter.html(`Team Dogs: ${deckTwo.length}`);
    $msg.html(inWar ? `It's War!!!` : `${winner} win!`);
    shuffle();
    checkForWinner();
  }

  function declareWinner() {
    $msg.html(`WINNER!!!!! ${winner.toUpperCase()} ARE THE BEST PETS!`).css('color','red');
    $deal.hide();
  }

});