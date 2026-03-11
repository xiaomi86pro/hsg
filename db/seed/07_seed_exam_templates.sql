TRUNCATE exam_template_items CASCADE;
TRUNCATE exam_template_sections CASCADE;
TRUNCATE exam_templates CASCADE;

INSERT INTO exam_templates (name, grade_level)
VALUES
('Grade 6 Midterm Exam', 6),
('Grade 6 Final Exam', 6);