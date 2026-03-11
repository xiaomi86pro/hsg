TRUNCATE options RESTART IDENTITY CASCADE;

INSERT INTO options (question_id, option_label, option_text, is_correct)
VALUES

-- Q1
(1,'A','Recieve',false),
(1,'B','Receive',true),
(1,'C','Receeve',false),
(1,'D','Recive',false),

-- Q2
(2,'A','cat',false),
(2,'B','hat',false),
(2,'C','table',true),
(2,'D','bat',false),

-- Q3
(3,'A','Earth',false),
(3,'B','Sun',true),
(3,'C','Moon',false),
(3,'D','Mars',false),

-- Q4
(4,'A','Planets and moons',true),
(4,'B','Cars and buses',false),
(4,'C','Buildings',false),
(4,'D','Trees',false),

-- Q5
(5,'A','Fast food',false),
(5,'B','Balanced diet and exercise',true),
(5,'C','Watching TV',false),
(5,'D','Sleeping all day',false),

-- Q6
(6,'A','2 PM',false),
(6,'B','3 PM',false),
(6,'C','4 PM',true),
(6,'D','5 PM',false),

-- Q7
(7,'A','In the city park',true),
(7,'B','In the classroom',false),
(7,'C','In the library',false),
(7,'D','At the hospital',false),

-- Q8
(8,'A','To waste resources',false),
(8,'B','To protect the environment',true),
(8,'C','To make water dirty',false),
(8,'D','To increase pollution',false);