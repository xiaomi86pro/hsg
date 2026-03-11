-- reset
TRUNCATE questions RESTART IDENTITY CASCADE;

INSERT INTO questions
(question_type_id, passage_id, question_text, grade_level, difficulty, category_id)
VALUES

-- question không thuộc passage
(1, NULL, 'Choose the correct spelling.', 6, 1, 1),
(1, NULL, 'Choose the word with different pronunciation.', 6, 1, 1),

-- passage question
(1, 1, 'What is the center of the solar system?', 6, 1, 1),
(1, 1, 'Which objects orbit the Sun?', 6, 1, 1),

(1, 2, 'What is necessary for a healthy lifestyle?', 6, 1, 1),

(1, 3, 'What time will the library close?', 6, 1, 1),

(1, 4, 'Where do families gather on weekends?', 7, 1, 1),

(1, 5, 'Why should people save water?', 6, 1, 1);