TRUNCATE question_categories RESTART IDENTITY CASCADE;

INSERT INTO question_categories
(code, name, section_id, display_order, default_question_type_id)
VALUES

-- SECTION A
('A1_PRONUNCIATION','Pronunciation',1,1,1),
('A2_STRESS','Word Stress',1,2,1),

-- SECTION B
('B1_VOCAB','Vocabulary',2,1,1),
('B2_GRAMMAR','Grammar',2,2,1),

-- SECTION C
('C1_READING_MCQ','Reading Comprehension MCQ',3,1,3),
('C2_READING_TEXT','Reading Short Answer',3,2,4),

-- SECTION D
('D1_SENTENCE_REORDER','Sentence Reorder',4,1,5),

-- SECTION E
('E1_TRUE_FALSE','True or False',5,1,6),

-- SECTION F
('F1_ESSAY','Essay Writing',6,1,9);