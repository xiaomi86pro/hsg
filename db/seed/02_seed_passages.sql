-- reset
TRUNCATE passages RESTART IDENTITY CASCADE;

INSERT INTO passages
(title, content, grade_level, passage_type_id)
VALUES
(
'The Solar System',
'The solar system consists of the Sun and the objects that orbit it including planets, moons, and asteroids.',
6,
1
),
(
'Healthy Lifestyle',
'Maintaining a healthy lifestyle requires balanced nutrition, regular exercise, and enough sleep.',
6,
1
),
(
'School Announcement',
'Students are reminded that the school library will close at 4 PM today for maintenance.',
6,
1
),
(
'City Park',
'The city park is a popular place where families gather on weekends for picnics and outdoor activities.',
7,
1
),
(
'Saving Water',
'Water is an essential resource. People should use water wisely to protect the environment.',
6,
1
);