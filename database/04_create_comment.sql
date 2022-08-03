CREATE TABLE `comment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `board_id` int,
  `comment` varchar(255),
  `cdepth` int DEFAULT 0,
  `parent_id` int DEFAULT NULL,
  `creatred_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comment (id) ON DELETE CASCADE
  -- CONSTRAINT fk_comment_user_id_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
  -- CONSTRAINT fk_comment_board_id_board_id FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE,
  -- CONSTRAINT fk_comment_parent_id_parent_id FOREIGN KEY (parent_id) REFERENCES comment (id) ON DELETE CASCADE
);
