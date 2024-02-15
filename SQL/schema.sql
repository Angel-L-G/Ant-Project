DROP DATABASE IF EXISTS antscape;
CREATE DATABASE antscape;
USE antscape;

DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `ants`;
DROP TABLE IF EXISTS `nests`;

CREATE TABLE `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `email` varchar (45),
  `active` BOOLEAN DEFAULT false,
  `hash` varchar(255),
  `banned` BOOLEAN DEFAULT false,
  constraint pk_usuarios PRIMARY KEY(id),
  constraint uk_name UNIQUE KEY(name)
);

CREATE TABLE `friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `id_friend` INT,
  CONSTRAINT pk_friends PRIMARY KEY(id),
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_friend FOREIGN KEY (id_friend) REFERENCES usuarios(id)
);

CREATE TABLE `nests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ant_type` VARCHAR(40),
  `id_user` INT NOT NULL,
  `deleted` BOOLEAN DEFAULT false,
  `map` TEXT NOT NULL,
  CONSTRAINT pk_ants PRIMARY KEY(id),
  CONSTRAINT fk_usernest FOREIGN KEY (id_user) REFERENCES usuarios(id)
);

CREATE TABLE `ants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40),
  `type` VARCHAR(30),
  `life` INT,
  `damage` INT,
  `working` BOOLEAN DEFAULT false,
  `cost` INT,
  `biome` VARCHAR(20),
  CONSTRAINT pk_ants PRIMARY KEY(id),
  constraint uk_name UNIQUE KEY(name, type)
);

CREATE TABLE `ant_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `id_ant` INT NOT NULL,
  CONSTRAINT pk_ants PRIMARY KEY(id),
  CONSTRAINT fk_userant FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_antuser FOREIGN KEY (id_ant) REFERENCES nests(id)
);

CREATE TABLE `ant_nest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_nest` INT NOT NULL,
  `id_ant` INT NOT NULL,
  `quantity` INT NOT NULL,
  CONSTRAINT pk_ant_nest PRIMARY KEY(id),
  CONSTRAINT fk_nestant FOREIGN KEY (id_nest) REFERENCES ants(id),
  CONSTRAINT fk_antnest FOREIGN KEY (id_ant) REFERENCES nests(id)
);

CREATE TABLE `bosses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40),
  `life` INT,
  `damage` INT,
  `reward` INT,
  CONSTRAINT pk_boss PRIMARY KEY(id)
);