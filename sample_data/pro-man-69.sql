DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;



CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    board_title VARCHAR(50) NOT NULL
);


CREATE TABLE cards (
    id SERIAL UNIQUE,
    board_id INTEGER NOT NULL,
    title VARCHAR(15) NOT NULL,
    status VARCHAR(15) NOT NULL DEFAULT 0,
    card_order INTEGER
);


ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

INSERT INTO boards VALUES (1,'Board 1');
INSERT INTO boards VALUES (2,'BÓRD 2');
SELECT pg_catalog.setval('boards_id_seq', 2, true);

INSERT INTO cards VALUES (1,1,'new card 1',0,0);
INSERT INTO cards VALUES (2,1,'new card 2',0,1);
INSERT INTO cards VALUES (3,1,'new card 3',1,0);
INSERT INTO cards VALUES (4,1,'new card 4',2,0);
INSERT INTO cards VALUES (5,2,'new card 5',3,0);
INSERT INTO cards VALUES (6,2,'new card 6',3,1);
INSERT INTO cards VALUES (7,1,'new card 1',0,0);
INSERT INTO cards VALUES (8,1,'new card 1',0,1);
INSERT INTO cards VALUES (9,1,'new card 1',1,0);
INSERT INTO cards VALUES (10,1,'new card 1',2,0);
INSERT INTO cards VALUES (11,1,'new card 1',3,0);
INSERT INTO cards VALUES (12,1,'new card 1',3,1);

SELECT pg_catalog.setval('cards_id_seq', 12, true);