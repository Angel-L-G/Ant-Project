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
  `id` INT NOT NULL AUTO_INCREMENT,
  `leader` INT NOT NULL,
  `name` varchar(45),
  `description` TEXT,
  `trophys` INT NOT NULL DEFAULT(10),
  `quantity` INT DEFAULT(1),
  `defense_range` INT DEFAULT(1-6),
  `defense_number` INT DEFAULT(null),
  constraint pk_guild PRIMARY KEY(id)
);

CREATE TABLE `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `email` varchar (45),
  `active` BOOLEAN DEFAULT false,
  `hash` varchar(255),
  `banned` BOOLEAN DEFAULT false,
  `eggs` varchar(30) DEFAULT("10"),
  `golden_eggs` varchar(10) DEFAULT ("0"),
  `img` varchar(255) DEFAULT("profile.png"),
  `id_guild` INT DEFAULT(null),
  constraint pk_usuarios PRIMARY KEY(id),
  CONSTRAINT fk_guild_user FOREIGN KEY (id_guild) REFERENCES guild(id),
  constraint uk_name UNIQUE KEY(name)
);

CREATE TABLE `administrative_info` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  `informacion` TEXT,
  `last_login` TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `guild_levels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_guild` INT NOT NULL,
  `name` varchar(30) NOT NULL,
  `cost` DOUBLE NOT NULL,
  `level` INT NOT NULL,
  `efect` varchar(255),
  CONSTRAINT pk_guild_levels PRIMARY KEY(id),
  CONSTRAINT fk_guild FOREIGN KEY (id_guild) REFERENCES guild(id)
);

CREATE TABLE `friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `id_friend` INT,
  CONSTRAINT pk_friends PRIMARY KEY(id),
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_friend FOREIGN KEY (id_friend) REFERENCES usuarios(id)
);

CREATE TABLE `blocked_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `id_blocked` INT,
  CONSTRAINT pk_blocked_users PRIMARY KEY(id),
  CONSTRAINT fk_user_bloqued FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_blocked FOREIGN KEY (id_blocked) REFERENCES usuarios(id)
);

CREATE TABLE `ants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40),
  `type` VARCHAR(30),
  `biome` VARCHAR(20),
  `description` VARCHAR(100),
  CONSTRAINT pk_ants PRIMARY KEY(id),
  constraint uk_name UNIQUE KEY(name, type)
);

CREATE TABLE `ant_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `id_ant` INT NOT NULL,
  CONSTRAINT pk_ants PRIMARY KEY(id),
  CONSTRAINT fk_userant FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_antuser FOREIGN KEY (id_ant) REFERENCES ants(id)
);

CREATE TABLE `nests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_ant` INT NOT NULL,
  `id_user` INT NOT NULL,
  `deleted` BOOLEAN DEFAULT false,
  CONSTRAINT pk_ants PRIMARY KEY(id),
  CONSTRAINT fk_nestant FOREIGN KEY (id_ant) REFERENCES ants(id),
  CONSTRAINT fk_usernest FOREIGN KEY (id_user) REFERENCES usuarios(id)
);

CREATE TABLE `nest_levels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nest_id` INT NOT NULL,
  `name` varchar(30),
  `production` DOUBLE NOT NULL,
  `cost` DOUBLE NOT NULL,
  `level` INT NOT NULL,
  `multiplier` DECIMAL(10, 2) NOT NULL,
  CONSTRAINT pk_nest_levels PRIMARY KEY(id),
  CONSTRAINT fk_nest_level FOREIGN KEY (nest_id) REFERENCES nests(id),
  CONSTRAINT uk_nest_level UNIQUE(nest_id, level)
);

CREATE TABLE `bosses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40),
  `life` INT,
  `damage` INT,
  `reward` INT,
  CONSTRAINT pk_boss PRIMARY KEY(id)
);

CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    last_message Text,
    id_guild INT NULL,
    id_user1 INT NULL,
    id_user2 INT NULL,
    FOREIGN KEY (id_guild) REFERENCES guild(id),
    FOREIGN KEY (id_user1) REFERENCES usuarios(id),
    FOREIGN KEY (id_user2) REFERENCES usuarios(id)
);

-- Tabla intermedia para la relación de usuarios con chats
CREATE TABLE user_chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_id INT,
    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    UNIQUE KEY (user_id, chat_id)
);

-- Definición de la tabla de mensajes
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NULL,
    sender_id INT,
    body TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES usuarios(id)
);

INSERT INTO guild (id, name, description, leader, trophys, quantity, defense_range, defense_number) VALUES (2, 'Guild2', 'desc', 1, 15, 7, 2, 5);
INSERT INTO guild (id, name, description, leader, trophys, quantity, defense_range, defense_number) VALUES (1, 'Guild2', 'desc', 2, 15, 7, 2, 5);

INSERT INTO usuarios (id, name, password, rol, email, active, hash, banned, eggs, golden_eggs, img, id_guild) VALUES (1, 'Usuario1', 'password1', 'ROLE_USER', 'usuario1@example.com', true, 'hash1', false, '10', '5', 'profile1.png', 1);
INSERT INTO usuarios (id, name, password, rol, email, active, hash, banned, eggs, golden_eggs, img, id_guild) VALUES (2, 'Usuario2', 'password2', 'ROLE_ADMIN', 'usuario2@example.com', false, 'hash2', true, '8', '3', 'profile2.png', 2);

INSERT INTO administrative_info (usuario_id, informacion, last_login) 
VALUES (1, 'Información administrativa para el usuario 1', '2024-03-25 15:30:00');
INSERT INTO administrative_info (usuario_id, informacion, last_login) 
VALUES (2, 'Información administrativa para el usuario 2', '2024-03-26 10:45:00');
INSERT INTO administrative_info (usuario_id, informacion, last_login) 
VALUES (1, 'Información administrativa para el usuario 3', '2024-03-24 18:20:00');

INSERT INTO guild_levels (id, id_guild, name, cost, level, efect) VALUES (1, 1, 'Level1', 100, 1, 'Efecto nivel 1');
INSERT INTO guild_levels (id, id_guild, name, cost, level, efect) VALUES (2, 1, 'Level2', 200, 2, 'Efecto nivel 2');
INSERT INTO guild_levels (id, id_guild, name, cost, level, efect) VALUES (3, 2, 'Level1', 150, 1, 'Efecto nivel 1');
INSERT INTO guild_levels (id, id_guild, name, cost, level, efect) VALUES (4, 2, 'Level2', 250, 2, 'Efecto nivel 2');

INSERT INTO friends (id, id_user, id_friend) VALUES (1, 1, 2);
INSERT INTO friends (id, id_user, id_friend) VALUES (2, 2, 1);

INSERT INTO blocked_users (id, id_user, id_blocked) VALUES (1, 1, 2);

INSERT INTO ants (id, name, type, biome, description) VALUES (1, 'Black Ant', 'Worker', 'All', 'The most common Ant.');
INSERT INTO ants (id, name, type, biome, description) VALUES (2, 'Red Ant', 'Warrior', 'Forests', 'Ant with a strong bite.');

INSERT INTO ant_user (id, id_user, id_ant) VALUES (1, 1, 1);
INSERT INTO ant_user (id, id_user, id_ant) VALUES (2, 2, 2);

INSERT INTO nests (id, id_ant, id_user, deleted) VALUES (1, 1, 1, false);
INSERT INTO nests (id, id_ant, id_user, deleted) VALUES (2, 2, 2, false);
INSERT INTO nests (id, id_ant, id_user, deleted) VALUES (3, 2, 2, false);

INSERT INTO nest_levels (id, nest_id, name, production, cost, level, multiplier) VALUES (1, 1, 'Level1', 10.0, 50, 1, 1.5);
INSERT INTO nest_levels (id, nest_id, name, production, cost, level, multiplier) VALUES (2, 1, 'Level2', 20.0, 100, 2, 2.0);
INSERT INTO nest_levels (id, nest_id, name, production, cost, level, multiplier) VALUES (3, 2, 'Level1', 15.0, 75, 1, 1.75);
INSERT INTO nest_levels (id, nest_id, name, production, cost, level, multiplier) VALUES (4, 2, 'Level2', 25.0, 125, 2, 2.25);

INSERT INTO bosses (id, name, life, damage, reward) VALUES (1, 'Boss1', 100, 20, 500);
INSERT INTO bosses (id, name, life, damage, reward) VALUES (2, 'Boss2', 150, 30, 750);

INSERT INTO chats (last_message, id_guild, id_user1, id_user2) VALUES 
('Hola, ¿cómo estás?', NULL, 1, 2),
('Estoy emocionado por el nuevo proyecto.', 1, NULL, NULL);

INSERT INTO user_chats (user_id, chat_id) VALUES 
(1, 1),
(1, 2);

INSERT INTO messages (chat_id, sender_id, body) VALUES 
(1, 1, 'Todo bien, gracias. ¿Y tú?'),
(1, 2, 'Bien, preparando unas cosas para la universidad.'),
(2, 2, 'Aún no lo sé, ¿tienes alguna sugerencia?'),
(2, 2, 'Podríamos ir al cine o salir a cenar.'),
(2, 1, 'Sí, el proyecto parece muy interesante.'),
(1, 1, 'Estoy ansioso por empezar.');
