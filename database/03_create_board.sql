CREATE TABLE `board` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `category_id` int,
  `board_title` varchar(255),
  `board_contents` varchar(255),
  `creatred_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_board_category_id_category_id FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE,
  CONSTRAINT fk_board_user_id_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);