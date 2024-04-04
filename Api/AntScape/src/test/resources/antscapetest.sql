SET MODE MYSQL;

DROP TABLE IF EXISTS `bosses`;
DROP TABLE IF EXISTS `nest_levels`;
DROP TABLE IF EXISTS `nests`;
DROP TABLE IF EXISTS `ant_user`;
DROP TABLE IF EXISTS `ants`;
DROP TABLE IF EXISTS `blocked_users`;
DROP TABLE IF EXISTS `friends`;
DROP TABLE IF EXISTS `guild_levels`;
DROP TABLE IF EXISTS `administrative_info`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `guild`;

CREATE TABLE guild (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45),
  trophys INT NOT NULL DEFAULT 1,
  quantity INT DEFAULT 1,
  defense_range INT DEFAULT 1,
  defense_number INT
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  password VARCHAR(200) NOT NULL,
  rol VARCHAR(45) NOT NULL,
  email VARCHAR(45),
  active BOOLEAN DEFAULT false,
  hash VARCHAR(255),
  banned BOOLEAN DEFAULT false,
  eggs VARCHAR(10) DEFAULT '10',
  golden_eggs VARCHAR(10) DEFAULT '0',
  img VARCHAR(255) DEFAULT 'profile.png',
  id_guild INT,
  FOREIGN KEY (id_guild) REFERENCES guild(id),
  UNIQUE (name)
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

CREATE TABLE guild_levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_guild INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  cost INT NOT NULL,
  level INT NOT NULL,
  efect VARCHAR(255),
  FOREIGN KEY (id_guild) REFERENCES guild(id),
  UNIQUE (id_guild, level)
);

CREATE TABLE friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_friend INT,
  FOREIGN KEY (id_user) REFERENCES usuarios(id),
  FOREIGN KEY (id_friend) REFERENCES usuarios(id)
);

CREATE TABLE blocked_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_friend INT,
  FOREIGN KEY (id_user) REFERENCES usuarios(id),
  FOREIGN KEY (id_friend) REFERENCES usuarios(id)
);

CREATE TABLE ants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40),
  type VARCHAR(30),
  biome VARCHAR(20),
  description VARCHAR(100),
  UNIQUE (name, type)
);

CREATE TABLE ant_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_ant INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES usuarios(id),
  FOREIGN KEY (id_ant) REFERENCES ants(id)
);

CREATE TABLE nests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_ant INT NOT NULL,
  id_user INT NOT NULL,
  deleted BOOLEAN DEFAULT false,
  FOREIGN KEY (id_ant) REFERENCES ants(id),
  FOREIGN KEY (id_user) REFERENCES usuarios(id)
);

CREATE TABLE nest_levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nest_id INT NOT NULL,
  name VARCHAR(30),
  production DOUBLE NOT NULL,
  cost INT NOT NULL,
  level INT NOT NULL,
  multiplier DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (nest_id) REFERENCES nests(id),
  UNIQUE (nest_id, level)
);

CREATE TABLE bosses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40),
  life INT,
  damage INT,
  reward INT
);

INSERT INTO guild (id, name, trophys, quantity, defense_range, defense_number) VALUES (1, 'Guild1', 10, 5, 1, 4);
INSERT INTO guild (id, name, trophys, quantity, defense_range, defense_number) VALUES (2, 'Guild2', 15, 7, 2, 5);
INSERT INTO guild (id, name, trophys, quantity, defense_range, defense_number) VALUES (3, 'Guild2', 15, 7, 2, 5);

INSERT INTO usuarios (id, name, password, rol, email, active, hash, banned, eggs, golden_eggs, img, id_guild) VALUES (1, 'Usuario1', 'password1', 'ROLE_USER', 'usuario1@example.com', true, 'hash1', false, '10', '5', 'profile1.png', 1);
INSERT INTO usuarios (id, name, password, rol, email, active, hash, banned, eggs, golden_eggs, img, id_guild) VALUES (2, 'Usuario2', 'password2', 'ROLE_ADMIN', 'usuario2@example.com', false, 'hash2', true, '8', '3', 'profile2.png', 2);

INSERT INTO administrative_info (usuario_id, informacion, last_login, created_at, updated_at) 
VALUES (1, 'Información administrativa para el usuario 1', '2024-03-25 15:30:00', '2024-03-25 15:30:00', '2024-03-25 15:30:00');
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

INSERT INTO blocked_users (id, id_user, id_friend) VALUES (1, 1, 2);

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