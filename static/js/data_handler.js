// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
        this._api_get(`/get-board/${boardId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get('/get-statuses', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
        this._api_get(`/get-card-status/${statusId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        this._api_get(`/get-cards/${boardId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
        this._api_get(`/get-card/${cardId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewBoard: function (callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_get('/create-board/', (response) => {
            this._data = response;
            callback(response);
        });

    },
    createNewCard: function (boardId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let data = {
            boardId: boardId
        };
        this._api_post('/create-new-card', data, callback)
    },

    createNewCardSablon: function (callback) {
        this._api_get('/create-new-card', (response) => {
            this._data = response;
            if (callback) {
                callback(response);
            }
        });

    },
};
