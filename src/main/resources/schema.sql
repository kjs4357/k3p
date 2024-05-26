-- User 테이블 생성
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL
);

-- Course 테이블 생성
CREATE TABLE IF NOT EXISTS course (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(255) NOT NULL
);

-- Lesson 테이블 생성
CREATE TABLE IF NOT EXISTS lesson (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sequence INT NOT NULL,
    url VARCHAR(255),
    course_id BIGINT,
    FOREIGN KEY (course_id) REFERENCES course(id)
);

-- UserLesson 테이블 생성
CREATE TABLE IF NOT EXISTS user_lesson (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    lesson_id BIGINT,
    completed BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (lesson_id) REFERENCES lesson(id)
);