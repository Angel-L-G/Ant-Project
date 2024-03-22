DROP DATABASE IF EXISTS antscape;
CREATE DATABASE antscape;
USE antscape;

SET GLOBAL time_zone = '-3:00';

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

CREATE TABLE `guild` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(45),
  `trophys` INT NOT NULL DEFAULT(1),
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
  `eggs` varchar(10) DEFAULT("10"),
  `golden_eggs` varchar(10) DEFAULT ("0"),
  `img` varchar(255) DEFAULT("profile.png"),
  `id_guild` INT DEFAULT(null),
  constraint pk_usuarios PRIMARY KEY(id),
  CONSTRAINT fk_guild_user FOREIGN KEY (id_guild) REFERENCES guild(id),
  constraint uk_name UNIQUE KEY(name)
);

CREATE TABLE `guild_levels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_guild` INT NOT NULL,
  `name` varchar(30) NOT NULL,
  `cost` INT NOT NULL,
  `level` INT NOT NULL,
  `efect` varchar(255),
  CONSTRAINT pk_guild_levels PRIMARY KEY(id),
  CONSTRAINT fk_guild FOREIGN KEY (id_guild) REFERENCES guild(id),
  CONSTRAINT uk_nest_level UNIQUE(id_guild, level)
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
  `id_friend` INT,
  CONSTRAINT pk_blocked_users PRIMARY KEY(id),
  CONSTRAINT fk_user_bloqued FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_blocked FOREIGN KEY (id_friend) REFERENCES usuarios(id)
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
  `cost` INT NOT NULL,
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