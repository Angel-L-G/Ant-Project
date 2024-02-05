DROP DATABASE IF EXISTS AntScape;
CREATE DATABASE AntScape;
USE AntScape;

DROP TABLE IF EXISTS `usuarios`;

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