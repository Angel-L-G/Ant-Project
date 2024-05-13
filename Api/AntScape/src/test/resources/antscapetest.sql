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
DROP TABLE IF EXISTS `messages`;
DROP TABLE IF EXISTS `user_chats`;
DROP TABLE IF EXISTS `chats`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `guild`;

CREATE TABLE guild (
  id INT AUTO_INCREMENT PRIMARY KEY,
  leader INT,
  name VARCHAR,
  description varchar,
  trophys INT,
  quantity INT,
  defense_range VARCHAR,
  defense_number INT,
  guild_image VARCHAR
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  password VARCHAR(200) NOT NULL,
  rol VARCHAR(45) NOT NULL,
  email VARCHAR(45),
  active BOOLEAN DEFAULT FALSE,
  hash VARCHAR(255),
  banned BOOLEAN DEFAULT FALSE,
  eggs VARCHAR(30) DEFAULT '10',
  golden_eggs VARCHAR(10) DEFAULT '0',
  img VARCHAR(255) DEFAULT 'profile.png',
  id_guild INT,
  total_money_generated VARCHAR(255),
  UNIQUE (name),
  FOREIGN KEY (id_guild) REFERENCES guild(id)
);

CREATE TABLE administrative_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  informacion TEXT,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE guild_levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_guild INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  cost DOUBLE NOT NULL,
  level INT NOT NULL,
  efect VARCHAR(255),
  FOREIGN KEY (id_guild) REFERENCES guild(id)
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
  id_blocked INT,
  FOREIGN KEY (id_user) REFERENCES usuarios(id),
  FOREIGN KEY (id_blocked) REFERENCES usuarios(id)
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
  deleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (id_ant) REFERENCES ants(id),
  FOREIGN KEY (id_user) REFERENCES usuarios(id)
);

CREATE TABLE nest_levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nest_id INT NOT NULL,
  name VARCHAR(30),
  production DOUBLE NOT NULL,
  cost DOUBLE NOT NULL,
  level INT NOT NULL,
  multiplier DECIMAL(10,2) NOT NULL,
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

CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  last_message TEXT,
  id_guild INT,
  id_user1 INT,
  id_user2 INT,
  FOREIGN KEY (id_guild) REFERENCES guild(id),
  FOREIGN KEY (id_user1) REFERENCES usuarios(id),
  FOREIGN KEY (id_user2) REFERENCES usuarios(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chat_id INT,
  sender_id INT,
  body TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (sender_id) REFERENCES usuarios(id)
);

CREATE TABLE user_chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  chat_id INT,
  UNIQUE (user_id, chat_id),
  FOREIGN KEY (user_id) REFERENCES usuarios(id),
  FOREIGN KEY (chat_id) REFERENCES chats(id)
);

-- Inserts de ejemplo para la tabla guild
INSERT INTO guild (leader, name, description, trophys, quantity, defense_range, defense_number, guild_image) 
VALUES (1, 'Guild 1', 'Description for Guild 1', 20, 3, '2-5', 2, 'guild_image1.jpg'),
       (2, 'Guild 2', 'Description for Guild 2', 15, 5, '1-4', 3, 'guild_image2.jpg');

-- Inserts de ejemplo para la tabla usuarios
INSERT INTO usuarios (name, password, rol, email, active, banned, eggs, golden_eggs, img, id_guild, total_money_generated, hash)
VALUES ('User1', 'password1', 'ROLE_USER', 'user1@example.com', TRUE, FALSE, '15', '2', 'user1.jpg', 1, '500', 'hash1'),
       ('User2', 'password2', 'ROLE_USER', 'user2@example.com', TRUE, FALSE, '20', '5', 'user2.jpg', 1, '800', 'hash2');

-- Inserts de ejemplo para la tabla administrative_info
INSERT INTO administrative_info (usuario_id, informacion, last_login, created_at, updated_at)
VALUES (1, 'Administrative info for User1', '2024-03-26 10:00:00', '2024-03-26 10:00:00', '2024-03-26 10:00:00'),
       (2, 'Administrative info for User2', '2024-03-26 10:00:00', '2024-03-26 10:00:00', '2024-03-26 10:00:00');

-- Inserts de ejemplo para la tabla guild_levels
INSERT INTO guild_levels (id_guild, name, cost, level, efect) 
VALUES (1, 'Level 1', 100.00, 1, 'Effect 1'),
       (2, 'Level 2', 150.00, 1, 'Effect 2');

-- Inserts de ejemplo para la tabla friends
INSERT INTO friends (id_user, id_friend) 
VALUES (1, 2),
       (2, 1);

-- Inserts de ejemplo para la tabla blocked_users
INSERT INTO blocked_users (id_user, id_blocked) 
VALUES (1, 2),
       (2, 1);

-- Inserts de ejemplo para la tabla ants
INSERT INTO ants (name, type, biome, description) 
VALUES ('Ant1', 'Type1', 'Biome1', 'Description for Ant1'),
       ('Ant2', 'Type2', 'Biome2', 'Description for Ant2');

-- Inserts de ejemplo para la tabla ant_user
INSERT INTO ant_user (id_user, id_ant) 
VALUES (1, 1),
       (2, 2);

-- Inserts de ejemplo para la tabla nests
INSERT INTO nests (id_ant, id_user) 
VALUES (1, 1),
       (2, 2);

-- Inserts de ejemplo para la tabla nest_levels
INSERT INTO nest_levels (nest_id, name, production, cost, level, multiplier) 
VALUES (1, 'Level 1', 10.00, 50.00, 1, 1.5),
       (2, 'Level 1', 12.00, 60.00, 1, 1.7);

-- Inserts de ejemplo para la tabla bosses
INSERT INTO bosses (name, life, damage, reward) 
VALUES ('Boss 1', 100, 20, 500),
       ('Boss 2', 150, 30, 800);

-- Inserts de ejemplo para la tabla chats
INSERT INTO chats (last_message, id_guild, id_user1, id_user2) 
VALUES ('Last message for chat 1', 1, 1, 2),
       ('Last message for chat 2', 2, 2, 1);

-- Inserts de ejemplo para la tabla messages
INSERT INTO messages (chat_id, sender_id, body, sent_at) 
VALUES (1, 1, 'Message 1 for chat 1', '2024-03-26 10:00:00'),
       (2, 2, 'Message 1 for chat 2', '2024-03-26 10:00:00');