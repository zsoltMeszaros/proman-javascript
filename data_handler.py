import database_common

@database_common.connection_handler
def get_card_statuses(cursor):

    cursor.execute('''
                    SELECT status FROM cards
                    ''')

    statuses = cursor.fetchall()

    return statuses


@database_common.connection_handler
def get_card_status_by_id(cursor, given_id):
    """
    Find the first status matching the given id
    """

    cursor.execute('''
                        SELECT status FROM cards
                        WHERE id = %(given_id)s
                        ''', {"id": given_id}
                   )

    status = cursor.fetchone()

    return status


@database_common.connection_handler
def get_boards(cursor):

    cursor.execute('''SELECT * FROM boards''')

    boards = cursor.fetchall()

    return boards


@database_common.connection_handler
def get_cards_for_board(cursor, given_id):

    cursor.execute('''
                    SELECT * FROM cards
                    WHERE board_id = %(given_id)s
                    ''', {"given_id": given_id}
                   )

    cards = cursor.fetchall()

    return cards


@database_common.connection_handler
def get_card_by_id(cursor, given_id):

    cursor.execute('''
                    SELECT * FROM cards
                    WHERE id = %(given_id)s
                    ''', {"id": given_id}
                   )

    card = cursor.fetchone()

    return card


@database_common.connection_handler
def get_board_by_id(cursor, given_id):

    cursor.execute('''
                    SELECT * FROM boards
                    WHERE id = %(given_id)s
                    ''', {"id": given_id}
                   )

    board = cursor.fetchone()

    return board


@database_common.connection_handler
def create_board(cursor):

    cursor.execute('''
                    SELECT MAX(id) from boards
                    ''')

    seq = cursor.fetchone()
    seq = seq['max'] + 1

    cursor.execute('''
                    INSERT INTO boards (board_title) VALUES ('Board %(seq)s')
                    ''', {'seq': seq})

    return


@database_common.connection_handler
def create_card(cursor, title):

    cursor.execute('''
                    INSERT INTO boards (board_title) VALUES (%(title)s)
                    ''',{'title': title})

    return

