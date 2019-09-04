from flask import Flask, render_template, url_for, redirect, request
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """

    return render_template('index.html')


@app.route('/create-board/')
@json_response
def create_board():
    data_handler.create_board()
    return data_handler.get_boards()


@app.route('/create-new-card', methods=['POST'])
@json_response
def create_card():
    board_id = request.get_json()
    print(board_id)
    data_handler.create_card(board_id['boardId'])
    return


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-statuses")
@json_response
def get_statuses():
    return data_handler.get_card_statuses()


@app.route("/get-card-status/<int:card_id>")
@json_response
def get_card_status(card_id: int):
    return data_handler.get_card_status_by_id(card_id)


@app.route("/get-card/<int:card_id>")
@json_response
def get_card_by_id(card_id: int):
    return data_handler.get_card_by_id(card_id)


@app.route("/get-board/<int:board_id>")
@json_response
def get_board_by_id(board_id: int):
    return data_handler.get_board_by_id(board_id)


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/rename-board-title", methods=["POST"])
@json_response
def rename_board_title():
    title = request.get_json()



def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
