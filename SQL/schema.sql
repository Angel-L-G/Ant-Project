DROP DATABASE IF EXISTS AntScape;
CREATE DATABASE AntScape;
USE AntScape;

DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `ants`;
DROP TABLE IF EXISTS `nests`;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `email` varchar (45),
  `active` int default 0,
  `hash` varchar(255),
  constraint pk_usuarios PRIMARY KEY(id),
  constraint uk_nombre UNIQUE KEY(nombre)
);

CREATE TABLE `friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `id_friend` INT,
  CONSTRAINT pk_friends PRIMARY KEY(id),
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES usuarios(id),
  CONSTRAINT fk_friend FOREIGN KEY (id_friend) REFERENCES usuarios(id)
)

CREATE TABLE `ants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40),
  `type` VARCHAR(30),
  `life` INT,
  `damage` INT,
  `working` INT,
  `cost` INT,
  CONSTRAINT pk_ants PRIMARY KEY(id)
);

CREATE TABLE `nests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT,
  `ant_type` VARCHAR(40),
  CONSTRAINT pk_ants PRIMARY KEY(id),
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES usuarios(id)
);