// wait til page is ready
$(document).ready(function() {

  // put all functions and variables inside an object
  var warGame = {

    // initialize the decks
    deckMain: [],
    deck1: [],
    deck2: [],
    suits: ["Hearts", "Diamonds", "Spades", "Clubs"],

    // create the base main deck
    makeDeck: function() {
      for (var i = 0; i < this.suits.length; i++) {
        for (var j = 2; j <= 14; j++) {
          var card = {
            rank: j,
            suit: this.suits[i],
          };
          this.deckMain.push(card);
        }
      }
    },

    // split random and equal set of 26 cards into each player's deck
    shuffleSplit: function() {
      var deal = 1;
      while (this.deckMain.length > 0) {
        var randomIndex = Math.floor(Math.random() * this.deckMain.length);
        var cardMove = this.deckMain.splice(randomIndex, 1);
        if (deal === 1) {
          this.deck1.push(cardMove[0]);
          deal = 2;
        } else {
          this.deck2.push(cardMove[0]);
          deal = 1;
        }
      }
    },

    // compare value of two cards and assign an outcome and the battle-array
    // compareCards: function(card1, card2) {
    //   var outcome = {
    //     result: "",
    //     array: [],
    //   };
    //   if (card1.rank > card2.rank) {
    //     outcome.result = "player1";
    //     outcome.array.push(card1, card2);
    //   } else if (card2.rank > card1.rank) {
    //     outcome.result = "player2";
    //     outcome.array.push(card2, card1);
    //   } else {
    //     outcome.result = "WAR";
    //     outcome.array.push(card1, card2);
    //   }
    //   // console.log(card1.rank);
    //   // console.log(card2.rank);
    //   // console.log(outcome);
    //   return outcome;
    // },

    showScore: function() {
      $("#score1").html(this.deck1.length);
    },

    // TODO have the images show up simultaneously, instead of lagging on the right
    showQuiver: function() {
      for (var i = 0; i < 52; i++) {
        var activeSquare = $(".square").eq(i);
        if (i < this.deck1.length) {
          activeSquare.attr("class", "square one");
        } else {
          activeSquare.attr("class", "square two");
        }
      }
    },

    setQuiver: function() {
      for (var i = 0; i <= 52; i++) {
        var div = document.createElement("div");
        $("#quivers").append(div);
        $(div).attr("class", "square one");
        if (i < 26) {
          $(div).attr("class", "square two");
        } else {}
      }
    },

    // append the played cards to the deck of whichever player won the battle
    // playHand: function() {
    //   var cardA = this.deck1.splice(0, 1)[0];
    //   var cardB = this.deck2.splice(0, 1)[0];
    //   var outcome = (this.compareCards(cardA, cardB));
    //   if (outcome.result === "player1") {
    //     console.log("player 1 wins the battle!");
    //     for (var i = 0; i < outcome.array.length; i++) {
    //       this.deck1.push(outcome.array[i]);
    //     }
    //   } else if (outcome.result === "player2") {
    //     console.log("player 2 wins the battle!");
    //     for (var j = 0; j < outcome.array.length; j++) {
    //       this.deck2.push(outcome.array[j]);
    //     }
    //   } else {
    //     //TODO figure out where to determine war
    //     console.log("tie");
    //     //alert ("WAR! Click 3 times. Then a 4th.");
    //
    //   }
    //   $("#battle").html(outcome.array[0].rank + " " + outcome.array[0].suit + " - v. - " + outcome.array[1].rank + " " + outcome.array[1].suit);
    //   $("#result").html(outcome.result);
    //   // console.log(outcome.array[0]);
    //   //console.log(this.deck1);
    //   //console.log(this.deck2);
    // },

    // parent function for hand functions
    runHand: function () {
      this.takeCards();
      this.executeHand();
    },

    // vessel object to track status of the hand, and the current array of the hand
    vessel: {
      status: "normal",
      array: [],
    },
    //TODO ^ reset vessel at the end, once the had is played out

    // add cards to the end
    takeCards: function () {
      if (this.vessel.status === "normal") {
        this.vessel.array.push(this.deck1.splice(0, 1)[0]);
        this.vessel.array.push(this.deck2.splice(0, 1)[0]);
        console.log(this.vessel.array);
      } else {
        for (var i = 0; i<4 ; i++) {
          this.vessel.array.push(this.deck1.splice(0, 1)[0]);
          this.vessel.array.push(this.deck2.splice(0, 1)[0]);
        }
        console.log(this.vessel.array);
      }
    },

    // compareCards
    measureCards: function () {
      var outcome = {
        result: "",
      };
      console.log(this.vessel.array[0]);
      var card1 = this.vessel.array[this.vessel.array.length - 2];
      var card2 = this.vessel.array[this.vessel.array.length - 1];
      console.log(card1);
      console.log(card2);
      if (card1.rank > card2.rank) {
        outcome.result = "player1";
      } else if (card2.rank > card1.rank) {
        outcome.result = "player2";
      } else {
        outcome.result = "WAR";
      }
      return outcome;
    },

    // executeHand
    executeHand: function () {
      var outcome = this.measureCards();
      if (outcome.result === "player1") {
        console.log("player 1 wins the battle!");
        for (var i = 0; i < this.vessel.array.length; i++) {
          this.deck1.push(this.vessel.array[i]);
        }
        this.vessel.array = [];
        this.vessel.status = "normal";
      } else if (outcome.result === "player2") {
        console.log("player 2 wins the battle!");
        for (var j = 0; j < this.vesel.array.length; j++) {
          this.deck2.push(this.vessel.array[j]);
        }
        this.vessel.array = [];
        this.vessel.status = "normal";
      } else {
        //TODO figure out where to determine war
        console.log("tie");
        //alert ("WAR! Click 3 times. Then a 4th.");

      }
    },

    //call the playHand on clicks of the play button
    callHand: function() {
      $("#play").on("click", function() {
        // TODO, how to make it say "this.playHand()" and work, not just "warGame.playHand"
        warGame.runHand();
        warGame.showQuiver();
        warGame.showScore();
      });
    },

    initializeGame: function() {
      this.makeDeck();
      this.shuffleSplit();
      this.runHand();
      this.setQuiver();
    }
  };


  warGame.initializeGame();


});
