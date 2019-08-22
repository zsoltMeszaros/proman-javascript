// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

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
        // This function should run once, when the page is loaded.
    },


    loadBoards: function () {
        // retrieves boards and makes showBoards called


        dataHandler.getBoards(function(boards){
            dom.clearBoards();
            dom.showBoards(boards);
        }
        );

    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also


        let boardList = '';


        for(let board of boards){

        dom.loadCards(board.id);

        boardList += `
        <ul class="board-container">
                
            <section class="board">
                <div class="board-header"><span class="board-title"> ${board.board_title} </span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns">
                    <div class="board-column">
                        <div class="board-column-title">New</div>
                        
                            <div class="board-column-content column-0${board.id}" > </div>
                        </div>
                        <div class="board-column">
                            <div class="board-column-title">In Progress</div>
                            <div class="board-column-content column-1${board.id} ">
                                
                                
                            </div>
                        </div>
                        <div class="board-column">
                            <div class="board-column-title">Testing</div>
                            <div class="board-column-content column-2${board.id} ">
                            </div>
                        </div>
                        <div class="board-column">
                            <div class="board-column-title">Done</div>
                            <div class="board-column-content column-3${board.id} ">
                                
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </ul>`;


        }
        this._appendToElement(document.getElementById("board"), boardList);


    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called

        dataHandler.getCardsByBoardId(boardId, function(cards){
            dom.showCards(boardId, cards);

        })
    },


    showCards: function (boardId, cards) {
        // shows the cards of a board
        // it adds necessary event listeners also

                let htmlCardsString = "";
                console.log(cards);
                //console.log(card.board_id)

                for (let j=0; j < 4; j++){
                    for(let card of cards) {
                        if (card.status === `${j}`) {
                            let emptyCard = `<div class="card" > ${card.title} </div>`;
                            htmlCardsString += emptyCard;

                        }
                    }
                        let element = document.createElement('div');
                        element.innerHTML = htmlCardsString;
                        document.querySelector(`.column-${j}` + boardId).appendChild(element);
                        htmlCardsString = "";
                }
        },


    clearBoards: function(){
        document.getElementById("board").textContent="";
    }
};

    // here comes more features
