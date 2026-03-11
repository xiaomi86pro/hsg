INSERT INTO "public"."question_categories" ("id", "code", "name", "section_id", "display_order", "default_question_type_id") VALUES ('26', 'A1_PRON', 'Pronunciation (4 options)', '1', '1', '12'), ('27', 'A2_STRESS', 'Stress Pattern (4 options)', '1', '2', '12'), ('28', 'B1_WORD_FORM', 'Word Form (Open Answer)', '2', '1', '13'), ('29', 'B1_PHRASAL_VERB', 'Phrasal Verbs (4 options)', '2', '2', '12'), ('30', 'B1_CONNECTOR', 'Connectors (4 options)', '2', '3', '12'), ('31', 'B1_COLLOCATION', 'Collocations (4 options)', '2', '4', '12'), ('32', 'B1_TENSE', 'Tenses (4 options)', '2', '5', '12'), ('33', 'B2_TRANSFORMATION_MC', 'Sentence Transformation (4 options)', '2', '6', '12'), ('34', 'C1_PASSAGE_MC', 'Passage 1 - Multiple blanks (4 options)', '3', '1', '12'), ('35', 'C2_COMPLETE', 'Passage 2 - Complete Sentence', '3', '2', '13'), ('36', 'C2_MC', 'Passage 2 - Multiple Choice', '3', '3', '12'), ('37', 'C3_OPEN_PASSAGE', 'Passage 3 - Open blanks (no options)', '3', '4', '13'), ('38', 'C4_OPEN_CLOZE', 'Open Cloze Test (no options)', '3', '5', '13'), ('39', 'D1_ERROR_ID', 'Error Identification (4 options)', '4', '1', '12'), ('40', 'D2_REWRITE', 'Rewrite Sentence (Open)', '4', '2', '13'), ('41', 'D3_REORDER_SIMPLE', 'Reorder Words (Simple)', '4', '3', '15'), ('42', 'D3_REORDER_ADV', 'Reorder Words + Grammar Change', '4', '4', '15'), ('43', 'E1_TRUE_FALSE', 'Listening True/False', '5', '1', '14'), ('44', 'E2_GAP_FILL', 'Listening Gap Filling', '5', '2', '17'), ('45', 'E3_MC', 'Listening Multiple Choice (4 options)', '5', '3', '12'), ('46', 'F1_IDIOMS', 'Idioms (4 options)', '6', '1', '12');

-- =========================================================
-- RESET DATABASE
-- =========================================================

TRUNCATE TABLE
user_answers,
exam_options,
exam_questions,
exams,
exam_template_items,
exam_template_sections,
exam_templates,
options,
questions,
passages,
question_categories,
sections,
question_types,
passage_types
RESTART IDENTITY CASCADE;


-- =========================================================
-- SECTIONS
-- =========================================================

INSERT INTO sections (code, name)
VALUES
('A','Phonetics'),
('B','Vocabulary and Grammar'),
('C','Reading'),
('D','Sentence Structure'),
('E','True or False'),
('F','Writing');


-- =========================================================
-- QUESTION TYPES
-- =========================================================

INSERT INTO question_types (code,name)
VALUES
('MCQ_SINGLE','Multiple Choice'),
('TEXT_INPUT','Text Input'),
('PASSAGE_MCQ','Passage Multiple Choice'),
('PASSAGE_TEXT','Passage Text'),
('REORDER','Sentence Reorder'),
('TRUE_FALSE','True False'),
('AUDIO_MCQ','Audio MCQ'),
('AUDIO_TEXT','Audio Text'),
('ESSAY','Essay');


-- =========================================================
-- PASSAGE TYPES
-- =========================================================

INSERT INTO passage_types (code,name)
VALUES
('reading','Reading Passage'),
('listening','Listening Passage');


-- =========================================================
-- QUESTION CATEGORIES
-- =========================================================

INSERT INTO question_categories
(code,name,section_id,display_order,default_question_type_id)
VALUES
('A1_PRON','Pronunciation',1,1,1),
('A2_STRESS','Word Stress',1,2,1),

('B1_VOCAB','Vocabulary',2,1,1),
('B2_GRAMMAR','Grammar',2,2,1),

('C1_READING','Reading MCQ',3,1,3),

('D1_REORDER','Sentence Reorder',4,1,5),

('E1_TRUEFALSE','True False',5,1,6),

('F1_ESSAY','Essay',6,1,9);


-- =========================================================
-- PASSAGES
-- =========================================================

INSERT INTO passages
(title,content,grade_level,passage_type_id)
VALUES
(
'Solar System',
'The solar system consists of the Sun and the objects that orbit it including planets and moons.',
6,
1
),
(
'Healthy Lifestyle',
'Maintaining a healthy lifestyle requires balanced nutrition and regular exercise.',
6,
1
),
(
'City Park',
'The city park is a popular place where families gather on weekends.',
6,
1
);


-- =========================================================
-- QUESTIONS
-- =========================================================

INSERT INTO questions
(question_type_id,passage_id,question_text,grade_level,difficulty,category_id)
VALUES

-- phonetics
(1,NULL,'Choose the word with different pronunciation.',6,1,1),

-- vocabulary
(1,NULL,'Choose the correct word.',6,1,3),

-- reading
(1,1,'What is the center of the solar system?',6,1,5),

-- reading
(1,2,'What is important for a healthy lifestyle?',6,1,5),

-- reorder
(5,NULL,'Arrange the words into a correct sentence.',6,2,6),

-- true false
(6,3,'Families gather in the city park on weekends.',6,1,7);


-- =========================================================
-- OPTIONS
-- =========================================================

INSERT INTO options (question_id,option_label,option_text,is_correct)
VALUES

-- Q1
(1,'A','cat',false),
(1,'B','hat',false),
(1,'C','table',true),
(1,'D','bat',false),

-- Q2
(2,'A','go',false),
(2,'B','went',true),
(2,'C','gone',false),
(2,'D','going',false),

-- Q3
(3,'A','Earth',false),
(3,'B','Sun',true),
(3,'C','Moon',false),
(3,'D','Mars',false),

-- Q4
(4,'A','Exercise and good diet',true),
(4,'B','Watching TV',false),
(4,'C','Sleeping all day',false),
(4,'D','Eating candy',false),

-- Q6
(6,'A','True',true),
(6,'B','False',false),
(6,'C','Not Given',false),
(6,'D','Unknown',false);


-- =========================================================
-- EXAM TEMPLATE
-- =========================================================

INSERT INTO exam_templates (name,grade_level)
VALUES
('Grade 6 Demo Exam',6);


-- =========================================================
-- TEMPLATE SECTIONS
-- =========================================================

INSERT INTO exam_template_sections
(exam_template_id,section_id,section_order)
VALUES
(1,1,1),
(1,2,2),
(1,3,3),
(1,4,4),
(1,5,5),
(1,6,6);


-- =========================================================
-- TEMPLATE ITEMS
-- =========================================================

INSERT INTO exam_template_items
(template_section_id,category_id,question_type_id,question_count,difficulty_min,difficulty_max)
VALUES
(1,1,1,1,1,2),
(2,3,1,1,1,2),
(3,5,3,1,1,2),
(4,6,5,1,1,3),
(5,7,6,1,1,2);
