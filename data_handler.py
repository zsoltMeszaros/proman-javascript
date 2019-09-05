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
    cursor.execute('''SELECT * FROM boards
                    ORDER BY id ASC
                    ''')

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
def create_card(cursor, board_id):
    cursor.execute('''
                        SELECT MAX(id) from cards
                        ''')

    seq = cursor.fetchone()
    seq = seq['max'] + 1

    cursor.execute('''
                        INSERT INTO cards (board_id, title, card_order) VALUES (%(board_id)s,'card %(seq)s',0)
                        ''', {'seq': seq, 'board_id': board_id})

    return


@database_common.connection_handler
def rename_title(cursor, board_id, title):
    cursor.execute('''
                    UPDATE boards
                    SET board_title = %(title)s
                    WHERE id = %(board_id)s
                    ''', {'board_id': board_id, 'title': title})

    return

@database_common.connection_handler
def card_status_update(cursor,id,new_status):
    cursor.execute("""
                    UPDATE cards
                    SET status = %(new_status)s
                    WHERE cards.id = %(id)s
                    """, { "new_status":new_status,"id":id})