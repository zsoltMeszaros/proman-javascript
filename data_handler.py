import database_common

@database_common.connection_handler
def get_card_status(given_id):
    """
    Find the first status matching the given id
    """

    return


@database_common.connection_handler
def get_boards(cursor):

    cursor.execute('''SELECT * FROM boards''')

    boards = cursor.fetchall()

    return boards


@database_common.connection_handler
def get_cards_for_board():

    return
