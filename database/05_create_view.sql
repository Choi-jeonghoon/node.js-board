CREATE TABLE `view` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `board_id` int,
   FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE,
   FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);
