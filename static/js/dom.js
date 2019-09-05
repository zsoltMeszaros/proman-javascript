// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {

        // loads the boards to the screen
        dom.loadBoards();

        // This function should run once, when the page is loaded.
        dom.newBoardCreate();
    },


    loadBoards: function () {
        // retrieves boards and makes showBoards called

        dataHandler.getBoards(function (boards) {
                dom.clearBoards();
                dom.showBoards(boards);
                dom.toggleButtons();

                dom.newCardCreate()
            }
        );


    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';


        for (let board of boards) {

            boardList += `
        <ul class="board-container">
            <section class="board">
                <div class="board-header"><span class="board-title">${board.board_title}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle" data-number="${board.id}"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns" data-number="${board.id}">
                    <div class="board-column">
                        <div class="board-column-title">New</div>
                        <div class="board-column-content column-0${board.id}" data-default="0"></div>
                    </div>
                    <div class="board-column" data-number="${board.id}">
                        <div class="board-column-title">In Progress</div>
                        <div class="board-column-content column-1${board.id}" data-default="1"></div>
                    </div>
                    <div class="board-column" data-number="${board.id}">
                        <div class="board-column-title">Testing</div>
                        <div class="board-column-content column-2${board.id}" data-default="2"></div>
                    </div>
                    <div class="board-column" data-number="${board.id}">
                        <div class="board-column-title">Done</div>
                        <div class="board-column-content column-3${board.id}" data-default="3"></div>
                </div>
            </section>
        </ul>`;

            dom.loadCards(board.id);
        }
        this._appendToElement(document.getElementById("board"), boardList);


    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called

        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(boardId, cards);

        })
    },


    showCards: function (boardId, cards) {
        // shows the cards of a board
        // it adds necessary event listeners also

        let htmlCardsString = "";
        let cardContainers = [];
        for (let j = 0; j < 4; j++) {
             htmlCardsString += '<div class="card" ></div>';
            for (let card of cards) {
                if (card.status === `${j}`) {
                    let emptyCard = `<div class="card" data-card-id="${card.id}" data-card-status="${card.status}"> ${card.title} </div>`;
                    htmlCardsString += emptyCard;

                }
            }
            let element = document.createElement('div');
            element.setAttribute('class', `drag-and-drop-${j}`);
            element.setAttribute('data-status-col', `${j}`);
            element.innerHTML = htmlCardsString;
            document.querySelector(`.column-${j}` + boardId).appendChild(element);
            htmlCardsString = "";
            cardContainers.push(element)
        }
        dragula(cardContainers)
        .on('drop', function (el) {
            dom.saveCards(el)
        })
    },

    toggleButtons: function () {
        let boards = document.querySelectorAll('.board-toggle');
        for (let button of boards) {
            button.addEventListener('click', function () {
                    const content = button.parentElement.parentElement.querySelector('.board-columns');
                    content.classList.toggle('hidden');
                }
            )
        }
    },

    clearBoards: function () {
        document.getElementById("board").textContent = "";
    },

    newBoardCreate: function () {
        let addNewBoard = document.querySelector("#create-board");
        addNewBoard.addEventListener("click", function (e) {
            if (e.detail === 1) {
                dataHandler.createNewBoard(function (data) {
                    dom.loadBoards()
                })
            }
        })

    },

    newCardCreate: function () {
        let addNewCardButtons = document.querySelectorAll(".board-add");
        for (let addNewCardButton of addNewCardButtons) {
            addNewCardButton.addEventListener("click", () => {
                const boardId = addNewCardButton.nextElementSibling.dataset.number;
                dataHandler.createNewCard(boardId, () => {
                    this.loadBoards();
                });
            })
        }
    },

    saveCards: function (card) {
        console.log(card);

    }
};

// here comes more features
