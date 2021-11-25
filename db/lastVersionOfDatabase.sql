-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2021 a las 00:02:15
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
-- Base de datos: `importproyectotest`
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

--
-- Volcado de datos para la tabla `council`
--

INSERT INTO `council` (`id`, `name`, `address`, `phone_number`, `email`, `web`, `postal_code`, `iban`) VALUES
(1, 'nameXPUT', 'addressXPUT', 'phoneXPUT', 'emailXPUT', 'webXPUT', 'postalCodeXPUT', 'ibanXPUT'),
(2, 'ayuntamiento gandia', 'calle universitat, 8', '634072668', 'gandia@gov.es', 'ayuntamientogandia.es', '03804', 'ES266484316'),
(3, 'ayuntamiento alcoy', 'calle san eloy, 12', '634372668', 'alcoy@gov.es', 'ayuntamientoalcoy.es', '03805', 'ES666484316');

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

--
-- Volcado de datos para la tabla `device`
--

INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES
(1, 15634, 5, 'amb_dev1', '6.000000', '77.000000', 1),
(2, 32532, 5, 'amb_dev2', '3.000000', '88.000000', 1),
(3, 32521, 6, 'amb_dev3', '3.000000', '88.000000', 1),
(4, 35321, 6, 'amb_dev4', '3.000000', '88.000000', 1),
(5, 123153, 3, 'namex', '12.000000', '5.000000', 1),
(6, 0, 2, 'namePOST', '36.000000', '32.000000', 0),
(7, 0, 2, 'namePOST', '36.000000', '32.000000', 0),
(8, 0, 2, 'namePOST', '36.000000', '32.000000', 0),
(9, 1212312, 2, 'namePOST', '36.000000', '32.000000', 0);

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

--
-- Volcado de datos para la tabla `gateway`
--

INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES
(1, 'SXV16431C', 1, 'root_gateway_1', '12.000000', '15.000000', 1),
(2, 'LXV16431C', 1, 'root_gateway_2', '12.000000', '15.000000', 1),
(3, 'PXV16431C', 2, 'gandia_gateway_1', '12.000000', '15.000000', 1),
(4, 'VXV16431C', 2, 'gandia_gateway_2', '12.000000', '15.000000', 1),
(5, 'NXV16431C', 3, 'alcoy_gateway_1', '12.000000', '15.000000', 1),
(6, 'RXV16431C', 3, 'alcoy_gateway_2', '12.000000', '15.000000', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gateway_network_server`
--

CREATE TABLE `gateway_network_server` (
  `id` int(11) NOT NULL,
  `gateway_id` int(11) NOT NULL,
  `network_server_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `gateway_network_server`
--

INSERT INTO `gateway_network_server` (`id`, `gateway_id`, `network_server_id`) VALUES
(3, 2, 5),
(4, 2, 5);

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

--
-- Volcado de datos para la tabla `network_server`
--

INSERT INTO `network_server` (`id`, `identifier`, `name`, `centralized`, `status`, `url`, `type`, `token`, `provider`) VALUES
(1, 123, 'test', 1, 1, 'das', 'mqtt', 'das', 'ads'),
(2, 15634, 'test2', 1, 1, 'das', 'rest', 'sda', 'a'),
(3, 0, 'namePost', 0, 1, 'ads', 'mqtt', 'adsas', 'undefined'),
(4, 153252, 'namePost', 0, 1, 'ads', 'mqtt', 'adsas', 'undefined'),
(5, 153252, 'namePost', 0, 1, 'ads', 'mqtt', 'adsas', 'undefined'),
(6, 153252, 'namePost', 0, 1, 'ads', 'mqtt', 'adsas', 'undefined'),
(8, 567676, 'namePut', 0, 1, 'ads', 'mqtt', 'adsas', 'providerPut');

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

--
-- Volcado de datos para la tabla `notification`
--

INSERT INTO `notification` (`id`, `sensor_id`, `body`, `subject`, `magnitude`) VALUES
(1, 2, 'a', 'd', 'green'),
(2, 15, 'a', 'b', 'red'),
(4, 6, 'bodyPUT', 'subjectPUT', 'green');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(2, 'admin'),
(1, 'root'),
(3, 'user');

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

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_EUI`, `name`, `status`) VALUES
(2, 2, 2, 'BD84526', 'ambientalDevice2', 0),
(3, 3, 3, 'CS63126', 'ambientalDevice2', 1),
(4, 4, 4, 'DS63126', 'ambientalDevice3', 0),
(5, 5, 4, 'ES63126', 'ambientalDevice4', 1),
(6, 6, 3, 'FS63126', 'ambientalDevice5', 0),
(7, 6, 2, 'GS63126', 'ambientalDevice6', 1),
(8, 5, 1, 'HS63126', 'ambientalDevice7', 0),
(9, 4, 1, 'IS63126', 'ambientalDevice8', 1),
(11, 2, 3, 'KS63126', 'ambientalDevice10', 1),
(12, 1, 4, 'LS63126', 'ambientalDevice11', 0),
(13, 1, 4, 'MS63126', 'ambientalDevice12', 1),
(14, 2, 3, 'NS63126', 'ambientalDevice13', 0),
(15, 3, 2, 'OS63126', 'ambientalDevice14', 1),
(16, 4, 1, 'PS63126', 'ambientalDevice15', 0),
(17, 5, 1, 'QS63126', 'ambientalDevice16', 1),
(18, 6, 2, 'RS63126', 'ambientalDevice17', 0),
(19, 6, 3, 'SS63126', 'ambientalDevice18', 1),
(20, 5, 4, 'TS63126', 'ambientalDevice19', 0),
(21, 4, 4, 'US63126', 'ambientalDevice20', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor_type`
--

CREATE TABLE `sensor_type` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sensor_type`
--

INSERT INTO `sensor_type` (`id`, `name`) VALUES
(1, 'ambiental_type'),
(5, 'co2_type'),
(4, 'humidity_type'),
(3, 'light_type'),
(6, 'parking_type'),
(2, 'water_type');

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

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES
(1, 1, 1, 'root', '', '1234', NULL, '617499124', 'email1@hotmail.com', NULL),
(2, 2, 3, 'admin', '', '1234', NULL, '684957124', 'email2@hotmail.com', NULL),
(3, 3, 3, 'user', '', '1234', NULL, '698721532', 'email3@hotmail.com', NULL),
(14, 1, 1, 'nameXPUT', 'surnamesXPUT', 'passwordXPUT', 'addressXPUT', 'phoneNumberXPUT', 'emailXPUT', 'postalcodeXPUT');

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
-- Volcado de datos para la tabla `user_device`
--

INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 3, 3),
(4, 3, 4);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `gateway`
--
ALTER TABLE `gateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `gateway_network_server`
--
ALTER TABLE `gateway_network_server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `network_server`
--
ALTER TABLE `network_server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Filtros para la tabla `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `Foreign_key_sensor_id` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`);

--
-- Filtros para la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `Foreign_key_device_id` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`),
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
  ADD CONSTRAINT `Foreign_key_device_id2` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`),
  ADD CONSTRAINT `Foreign_key_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
