CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nick_name` varchar(255),
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP 
);