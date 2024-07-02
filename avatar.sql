-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-07-2024 a las 01:20:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nexus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar`
--

CREATE TABLE `avatar` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `creador` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `avatar`
--

INSERT INTO `avatar` (`codigo`, `nombre`, `descripcion`, `edad`, `imagen_url`, `creador`) VALUES
(4, 'Momo', 'Ratón divertido e inquieto', 15, 'eren_1719783298.jpg', 'Anahi'),
(6, 'Cami', 'Soñadora', 3, 'nezuko_1719783381.jpg', 'Lucas'),
(7, 'Dominic', 'Chihuahua histerica', 8, 'mikasa_1719785728.jpg', 'Lopez Anahi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avatar`
--
ALTER TABLE `avatar`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avatar`
--
ALTER TABLE `avatar`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
