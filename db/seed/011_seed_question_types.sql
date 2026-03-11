TRUNCATE question_types RESTART IDENTITY CASCADE;

INSERT INTO question_types (code, name)
VALUES
('MCQ_SINGLE','Multiple Choice (Single Answer)'),
('TEXT_INPUT','Short Text Answer'),
('PASSAGE_MCQ','Passage Multiple Choice'),
('PASSAGE_TEXT','Passage Text Input'),
('REORDER','Sentence Reorder'),
('TRUE_FALSE','True or False'),
('AUDIO_MCQ','Audio Multiple Choice'),
('AUDIO_TEXT','Audio Text Input'),
('ESSAY','Essay Writing');