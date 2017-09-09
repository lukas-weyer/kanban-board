$(function() {
  function randomString() {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var str = "";
    for (i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      // CREATING COMPONENTS OF COLUMNS
      var $column = $("<div>").addClass("column");
      var $columnTitle = $("<h2>")
        .addClass("column-title")
        .text(self.name);
      var $columnCardList = $("<ul>").addClass("column-card-list");
      var $columnDelete = $("<button>")
        .addClass("btn-delete")
        .text("x");
      var $columnAddCard = $("<button>")
        .addClass("add-card")
        .text("add a card");
      // ADDING EVENTS
      $columnDelete.click(function() {
        self.removeColumn();
      });
      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });
      // CONSTRUCTION COLUMN ELEMENT
      $column
        .append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);
      // RETURN OF CREATED COLUMN
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children("ul").append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      // CREATING THE BLOCKS
      var $card = $("<li>").addClass("card");
      var $cardDescription = $("<p>")
        .addClass("card-description")
        .text(self.description);
      var $cardDelete = $("<button>")
        .addClass("btn-delete")
        .text("x");
      // ADDING EVENTS
      $cardDelete.click(function() {
        self.removeCard();
      });
      // CONSTRUCTION CARD ELEMENT
      $card.append($cardDelete).append($cardDescription);
      // RETURN OF CREATED CARD
      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };
  var board = {
    name: "Kanban Board",
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $("#board .column-container")
  };
  function initSortable() {
    $(".column-card-list")
      .sortable({
        connectWith: ".column-card-list",
        opacity: 0.8,
        scroll: false,
        placeholder: "card-placeholder"
      })
      .disableSelection();
  }
  $(".create-column").click(function() {
    var name = prompt("Enter a column name");
    var column = new Column(name);
    board.addColumn(column);
  });
  // EXAMPLE COLUMNS
  var todoColumn = new Column("To do");
  var doingColumn = new Column("Doing");
  var doneColumn = new Column("Done");
  // ADD COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);
  // CREATING A NEW CARDS
  var card1 = new Card("New task");
  var card2 = new Card("Task in progress");
  var card3 = new Card("Completed task");
  // ADD CARDS TO THE COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
});
