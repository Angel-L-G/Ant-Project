DROP DATABASE IF EXISTS antscape;
CREATE DATABASE antscape;
USE antscape;

SET GLOBAL time_zone = '+01:00';

DROP TABLE IF EXISTS `chat_message`;
DROP TABLE IF EXISTS `chat_user`;
DROP TABLE IF EXISTS `chats`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `ants`;
DROP TABLE IF EXISTS `nests`;
DROP TABLE IF EXISTS `guild`;
DROP TABLE IF EXISTS `guild_levels`;
DROP TABLE IF EXISTS `friends`;
DROP TABLE IF EXISTS `nests_levels`;
DROP TABLE IF EXISTS `ants`;
DROP TABLE IF EXISTS `ants_user`;
DROP TABLE IF EXISTS `blocked_users`;
DROP TABLE IF EXISTS `bosses`;
DROP TABLE IF EXISTS `administrative_info`;

CREATE TABLE `guild` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leader` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `trophys` int NOT NULL DEFAULT (10),
  `quantity` int DEFAULT (1),
  `defense_range` varchar(10) DEFAULT '1-6',
  `defense_number` int DEFAULT (NULL),
  `guild_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `hash` varchar(255) DEFAULT NULL,
  `banned` tinyint(1) DEFAULT '0',
  `eggs` varchar(30) DEFAULT (_utf8mb4'10'),
  `golden_eggs` varchar(10) DEFAULT (_utf8mb4'0'),
  `img` varchar(255) DEFAULT (_utf8mb4'profile.png'),
  `id_guild` int DEFAULT (NULL),
  `total_money_generated` varchar(255) DEFAULT (_utf8mb4'10'),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`),
  KEY `fk_guild_user` (`id_guild`),
  CONSTRAINT `fk_guild_user` FOREIGN KEY (`id_guild`) REFERENCES `guild` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `administrative_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `informacion` text,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `administrative_info_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `guild_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_guild` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `cost` double NOT NULL,
  `level` int NOT NULL,
  `efect` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_guild` (`id_guild`),
  CONSTRAINT `fk_guild` FOREIGN KEY (`id_guild`) REFERENCES `guild` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `friends` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_friend` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`id_user`),
  KEY `fk_friend` (`id_friend`),
  CONSTRAINT `fk_friend` FOREIGN KEY (`id_friend`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `blocked_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_blocked` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_bloqued` (`id_user`),
  KEY `fk_blocked` (`id_blocked`),
  CONSTRAINT `fk_blocked` FOREIGN KEY (`id_blocked`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_user_bloqued` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `biome` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ant_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_ant` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userant` (`id_user`),
  KEY `fk_antuser` (`id_ant`),
  CONSTRAINT `fk_antuser` FOREIGN KEY (`id_ant`) REFERENCES `ants` (`id`),
  CONSTRAINT `fk_userant` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`)
);

CREATE TABLE `nests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_ant` int NOT NULL,
  `id_user` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_nestant` (`id_ant`),
  KEY `fk_usernest` (`id_user`),
  CONSTRAINT `fk_nestant` FOREIGN KEY (`id_ant`) REFERENCES `ants` (`id`),
  CONSTRAINT `fk_usernest` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nest_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nest_id` int NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `production` double NOT NULL,
  `cost` double NOT NULL,
  `level` int NOT NULL,
  `multiplier` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_nest_level` FOREIGN KEY (`nest_id`) REFERENCES `nests` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `bosses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `life` int DEFAULT NULL,
  `damage` int DEFAULT NULL,
  `reward` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_message` text,
  `id_guild` int DEFAULT NULL,
  `id_user1` int DEFAULT NULL,
  `id_user2` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_guild` (`id_guild`),
  KEY `id_user1` (`id_user1`),
  KEY `id_user2` (`id_user2`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`id_guild`) REFERENCES `guild` (`id`),
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`id_user1`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`id_user2`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`chat_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `user_chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `user_chats_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `body` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

insert into usuarios (id, name, password, rol, email, active, hash, banned, eggs, golden_eggs, img, id_guild, total_money_generated) values 
('3', 'a', '$2a$10$Ar/78rvhsCt2hrFNRKeCdeZJ5//eGgzAO7WJ4R8G8WngJnHOlbp4C', 'ROLE_ADMIN', 'a@gmail.com', '1', '$2a$10$eqo7dSAauqgM3j3NQg9AeumHprc5fzOKNbv/kHlg7Xe8iY..35S1W', '0', '4227', '156', 'profile.png', null, '497'),
('4', 'b', '$2a$10$iuMHAG.mtlNyMvM4GtEG1.bk9//cxo2JZvXCbRCimtMR7EAGhbaka', 'ROLE_USER', 'b@gmail.com', '1', '$2a$10$JYnlUywiv6y6J.wRc6fgIevkhU0omvqqqggqtXu1UnS/2mh91f2UO', '0', '10', '0', 'profile.png', null, '10'),
('5', 'c', '$2a$10$euyo1ktqwFMdWtRTN7.HO.jiOYYnrrbRlyeibrRuAMt3GB.QInBeO', 'ROLE_USER', 'c@gmail.com', '1', '$2a$10$BrENOJcTanuo74FcV46Dj.ON.bFZEKNkXP23b6WvnWue7TKZJBL76', '0', '10', '0', 'profile.png', null, '10');

insert into ants values(1, 'Hormiga de fuego', 'Fuego', 'Desierto', 'Hormiga que vive en el desierto y es capaz de soportar altas temperaturas');