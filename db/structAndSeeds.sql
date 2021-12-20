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
  `device_EUI` varchar(64) NOT NULL,
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
  `unit` varchar(16) NOT NULL,
  `danger` enum('red','yellow','green','') NOT NULL
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


--
-- council seeds
--
INSERT INTO `council` (`id`, `name`, `address`, `phone_number`, `email`, `web`, `postal_code`, `iban`) VALUES (1, 'root_council', '', '', '', NULL, '', '');
INSERT INTO `council` (`id`, `name`, `address`, `phone_number`, `email`, `web`, `postal_code`, `iban`) VALUES (2, 'ayuntamiento gandia', 'calle universitat, 8', '634072668', 'gandia@gov.es', 'ayuntamientogandia.es', '03804', 'ES266484316');
INSERT INTO `council` (`id`, `name`, `address`, `phone_number`, `email`, `web`, `postal_code`, `iban`) VALUES (3, 'ayuntamiento alcoy', 'calle san eloy, 12', '634372668', 'alcoy@gov.es', 'ayuntamientoalcoy.es', '03805', 'ES666484316');
--
-- gateway seeds 
--
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (1, 'SXV16431C', '3', 'gandia_gateway_1', '38.968', '-0.1844', '1');
--
-- device seeds 
--
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (1, 'dev1', '1', 'amb_dev1', '38.958', '-0.185', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (2, 'dev2', '1', 'amb_dev2', '38.96', '-0.182', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (3, 'dev3', '1', 'amb_dev3', '38.959', '-0.1833', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (4, 'dev4', '1', 'amb_dev4', '38.972', '-0.1844', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (5, 'dev5', '1', 'amb_dev5', '38.965', '-0.186', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (6, 'dev6', '1', 'amb_dev6', '38.97', '-0.178', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (7, 'dev7', '1', 'amb_dev7', '38.973', '-0.189', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (8, 'dev8', '1', 'amb_dev8', '38.962', '-0.192', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (9, 'dev9', '1', 'amb_dev9', '38.965', '-0.194', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (10, 'dev10', '1', 'amb_dev10', '38.976', '-0.19', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (11, 'dev11', '1', 'amb_dev11', '38.977', '-0.183', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (12, 'dev12', '1', 'amb_dev12', '38.954', '-0.185', '1');

--
-- sensor type seeds
--
INSERT INTO sensor_type (id, name) VALUES (5, 'C12'), (4, 'CO'), (18, 'EPSILON'), (6, 'H2'), (7, 'H2S'), (8, 'HCL'), (9, 'HCN'), (2, 'HCO'), (10, 'HF'), (11, 'NH3'), (12, 'NO2'), (17, 'NOISE'), (14, 'O2'), (13, 'O3'), (15, 'SO2'), (1, 'SOIL'), (16, 'TEMP'), (3, 'VOC');
--
-- sensor seeds 
--
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (1, '1', '1', 'AS63126', 'ambientalDevice1', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (2, '1', '1', 'BD84526', 'ambientalDevice2', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (3, '1', '2', 'CS63126', 'ambientalDevice3', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (4, '1', '2', 'DS63126', 'ambientalDevice4', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (5, '1', '3', 'ES63126', 'ambientalDevice5', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (6, '1', '3', 'FS63126', 'ambientalDevice6', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (7, '1', '4', 'GS63126', 'ambientalDevice7', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (8, '1', '4', 'HS63126', 'ambientalDevice8', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (9, '1', '5', 'IS63126', 'ambientalDevice9', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (10, '1', '5', 'JS63126', 'ambientalDevice10', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (11, '1', '6', 'KS63126', 'ambientalDevice11', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (12, '1', '6', 'LS63126', 'ambientalDevice12', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (13, '1', '7', 'MS63126', 'ambientalDevice13', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (14, '1', '7', 'NS63126', 'ambientalDevice14', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (15, '1', '8', 'OS63126', 'ambientalDevice15', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (16, '1', '8', 'PS63126', 'ambientalDevice16', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (17, '1', '9', 'QS63126', 'ambientalDevice17', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (18, '1', '9', 'RS63126', 'ambientalDevice18', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (19, '1', '10', 'SS63126', 'ambientalDevice19', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (20, '1', '10', 'TS63126', 'ambientalDevice20', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (21, '1', '11', 'US63126', 'ambientalDevice21', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (22, '1', '11', 'AS631261', 'ambientalDevice22', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (23, '1', '12', 'BD845261', 'ambientalDevice23', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (24, '1', '12', 'DS631261', 'ambientalDevice24', '1');

--
-- role seeds
--
INSERT INTO `role` (`id`, `name`) VALUES (1, 'root');
INSERT INTO `role` (`id`, `name`) VALUES (2, 'admin');
INSERT INTO `role` (`id`, `name`) VALUES (3, 'user');
--
-- user seeds
--
INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES (1, '1', '1', 'root', '', '1234', NULL, '617499124', 'root@hotmail.com', NULL);
INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES (2, '2', '3', 'admin', '', '1234', NULL, '684957124', 'admin@hotmail.com', NULL);
INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES (3, '3', '3', 'user', '', '1234', NULL, '698721532', 'user@hotmail.com', NULL);
--
-- user_device seeds
--
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (1, '3', '1');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (2, '3', '2');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (3, '3', '3');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (4, '3', '4');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (5, '3', '5');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (6, '3', '6');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (7, '3', '7');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (8, '3', '8');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (9, '3', '9');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (10, '3', '10');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (11, '3', '11');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (12, '3', '12');--
-- network_server seeds
--
INSERT INTO `network_server` (`id`, `identifier`, `name`, `centralized`, `status`, `url`, `type`, `token`, `provider`) VALUES
 (1, '123', 'ns1', '1', '1', 'nsUrl1', 'mqtt', 'nstok1', 'nsprov1');
--
-- gateway_network_server seeds
--
INSERT INTO `gateway_network_server` (`id`, `gateway_id`, `network_server_id`) VALUES
(1, 1, 1);
--
-- notification seeds
--
INSERT INTO `notification` (`id`, `sensor_id`, `body`, `subject`, `magnitude`) VALUES
(5, 1, 'body1', 'subj1', 'yellow'),
(6, 2, 'body2', 'subj2', 'red'),
(7, 3, 'body3', 'subj3', 'green'),
(8, 4, 'body4', 'subj4', 'yellow');

--
-- measure seeds
--

INSERT INTO `measure` (`id`, `sensor_id`, `value`, `timestamp`, `unit`, `danger`) VALUES
(1, 1, 100, '2021-12-16 10:33:40', 'ppm', 'green'),
(2, 2, 120, '2021-12-16 10:33:40', 'ppm', 'green'),
(3, 3, 110, '2021-12-16 10:33:40', 'ppm', 'green'),
(4, 4, 210, '2021-12-16 10:33:40', 'ppm', 'green'),
(5, 5, 80, '2021-12-16 10:33:40', 'ppm', 'green'),
(6, 6, 92, '2021-12-16 10:33:40', 'ppm', 'green'),
(7, 7, 810, '2021-12-16 10:33:40', 'ppm', 'red'),
(8, 8, 710, '2021-12-16 10:33:40', 'ppm', 'yellow'),
(9, 9, 890, '2021-12-16 10:33:40', 'ppm', 'red'),
(10, 10, 421, '2021-12-16 10:33:40', 'ppm', 'green'),
(11, 11, 324, '2021-12-16 10:33:40', 'ppm', 'green'),
(12, 12, 300, '2021-12-16 15:19:18', 'ppm', 'green'),
(13, 13, 784, '2021-12-16 15:19:18', 'ppm', 'yellow'),
(14, 14, 742, '2021-12-16 14:58:13', 'ppm', 'yellow'),
(15, 15, 15, '2021-12-16 14:59:10', 'ppm', 'green');