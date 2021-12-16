-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2021 a las 22:02:24
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gesinenenviromental`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `council`
--

CREATE TABLE `council` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `address` varchar(128) NOT NULL,
  `phone_number` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `web` varchar(64) DEFAULT NULL,
  `postal_code` varchar(32) NOT NULL,
  `iban` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `device`
--

CREATE TABLE `device` (
  `id` int(11) NOT NULL,
  `device_EUI` int(11) NOT NULL,
  `gateway_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gateway`
--

CREATE TABLE `gateway` (
  `id` int(11) NOT NULL,
  `mac` varchar(64) NOT NULL,
  `council_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gateway_network_server`
--

CREATE TABLE `gateway_network_server` (
  `id` int(11) NOT NULL,
  `gateway_id` int(11) NOT NULL,
  `network_server_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `measure`
--

CREATE TABLE `measure` (
  `id` int(16) NOT NULL,
  `sensor_id` int(16) NOT NULL,
  `value` float NOT NULL,
  `timestamp` datetime NOT NULL,
  `unit` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `network_server`
--

CREATE TABLE `network_server` (
  `id` int(11) NOT NULL,
  `identifier` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `centralized` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `url` varchar(128) NOT NULL,
  `type` enum('mqtt','rest') NOT NULL,
  `token` varchar(255) NOT NULL,
  `provider` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `sensor_id` int(11) NOT NULL,
  `body` varchar(500) NOT NULL,
  `subject` varchar(128) NOT NULL,
  `magnitude` enum('red','yellow','green') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `id` int(11) NOT NULL,
  `sensor_type_id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `device_EUI` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor_type`
--

CREATE TABLE `sensor_type` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `council_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `surnames` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `address` varchar(128) DEFAULT NULL,
  `phone_number` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `postal_code` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_device`
--

CREATE TABLE `user_device` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `council`
--
ALTER TABLE `council`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iban_unique_index` (`iban`),
  ADD UNIQUE KEY `email_unique_index` (`email`),
  ADD UNIQUE KEY `phone_number_unique_index` (`phone_number`);

--
-- Indices de la tabla `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Foreign_key_gateway_id` (`gateway_id`);

--
-- Indices de la tabla `gateway`
--
ALTER TABLE `gateway`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mac_unique_index` (`mac`),
  ADD UNIQUE KEY `name_unique_index` (`name`),
  ADD KEY `Foreign_key_council_id` (`council_id`);

--
-- Indices de la tabla `gateway_network_server`
--
ALTER TABLE `gateway_network_server`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Foreign_key_network_server_id` (`network_server_id`),
  ADD KEY `Foreign_key_gateway_id2` (`gateway_id`);

--
-- Indices de la tabla `measure`
--
ALTER TABLE `measure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `measure_sensor_restrict_fk` (`sensor_id`);

--
-- Indices de la tabla `network_server`
--
ALTER TABLE `network_server`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Foreign_key_sensor_id` (`sensor_id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique_index` (`name`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_eui_unique_index` (`device_EUI`),
  ADD KEY `Foreign_key_sensor_type_id` (`sensor_type_id`),
  ADD KEY `Foreign_key_device_id` (`device_id`);

--
-- Indices de la tabla `sensor_type`
--
ALTER TABLE `sensor_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique_index` (`name`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_unique_index` (`email`),
  ADD UNIQUE KEY `phone_number_unique_index` (`phone_number`),
  ADD KEY `Foreign_key_council_id2` (`council_id`),
  ADD KEY `Foreign_key_role_id` (`role_id`);

--
-- Indices de la tabla `user_device`
--
ALTER TABLE `user_device`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Foreign_key_user_id` (`user_id`),
  ADD KEY `Foreign_key_device_id2` (`device_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `council`
--
ALTER TABLE `council`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `device`
--
ALTER TABLE `device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `gateway`
--
ALTER TABLE `gateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `gateway_network_server`
--
ALTER TABLE `gateway_network_server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `measure`
--
ALTER TABLE `measure`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `network_server`
--
ALTER TABLE `network_server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT de la tabla `sensor_type`
--
ALTER TABLE `sensor_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `user_device`
--
ALTER TABLE `user_device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `Foreign_key_gateway_id` FOREIGN KEY (`gateway_id`) REFERENCES `gateway` (`id`);

--
-- Filtros para la tabla `gateway`
--
ALTER TABLE `gateway`
  ADD CONSTRAINT `Foreign_key_council_id` FOREIGN KEY (`council_id`) REFERENCES `council` (`id`);

--
-- Filtros para la tabla `gateway_network_server`
--
ALTER TABLE `gateway_network_server`
  ADD CONSTRAINT `Foreign_key_gateway_id2` FOREIGN KEY (`gateway_id`) REFERENCES `gateway` (`id`),
  ADD CONSTRAINT `Foreign_key_network_server_id` FOREIGN KEY (`network_server_id`) REFERENCES `network_server` (`id`);

--
-- Filtros para la tabla `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `measure_sensor_restrict_fk` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `Foreign_key_sensor_id` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `Foreign_key_device_id` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Foreign_key_sensor_type_id` FOREIGN KEY (`sensor_type_id`) REFERENCES `sensor_type` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `Foreign_key_council_id2` FOREIGN KEY (`council_id`) REFERENCES `council` (`id`),
  ADD CONSTRAINT `Foreign_key_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Filtros para la tabla `user_device`
--
ALTER TABLE `user_device`
  ADD CONSTRAINT `Foreign_key_device_id2` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Foreign_key_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
