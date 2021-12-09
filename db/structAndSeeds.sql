SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cleanseed`
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
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (1, 'SXV16431C', '1', 'root_gateway_1', '12', '15', '1');
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (2, 'LXV16431C', '1', 'root_gateway_2', '12', '15', '1');
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (3, 'PXV16431C', '2', 'gandia_gateway_1', '12', '15', '1');
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (4, 'VXV16431C', '2', 'gandia_gateway_2', '12', '15', '1');
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (5, 'NXV16431C', '3', 'alcoy_gateway_1', '12', '15', '1');
INSERT INTO `gateway` (`id`, `mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES (6, 'RXV16431C', '3', 'alcoy_gateway_2', '12', '15', '1');
--
-- device seeds 
--
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (1, '15634', '1', 'amb_dev1', '6', '77', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (2, '32532', '1', 'amb_dev2', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (3, '3251', '2', 'amb_dev3', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (4, '5321', '2', 'amb_dev4', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (5, '5634', '3', 'amb_dev5', '6', '77', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (6, '322', '3', 'amb_dev6', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (7, '32521', '4', 'amb_dev7', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (8, '21', '4', 'amb_dev8', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (9, '1634', '5', 'amb_dev9', '6', '77', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (10, '352', '5', 'amb_dev10', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (11, '751', '6', 'amb_dev11', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (12, '6367', '6', 'amb_dev12', '3', '88', '1');

--
-- sensor type seeds
--
INSERT INTO `sensor_type` (`id`, `name`) VALUES (1, 'ambiental_type');
INSERT INTO `sensor_type` (`id`, `name`) VALUES (2, 'water_type');
INSERT INTO `sensor_type` (`id`, `name`) VALUES (3, 'light_type');
INSERT INTO `sensor_type` (`id`, `name`) VALUES (4, 'humidity_type');
INSERT INTO `sensor_type` (`id`, `name`) VALUES (5, 'co2_type');
INSERT INTO `sensor_type` (`id`, `name`) VALUES (6, 'parking_type');
--
-- sensor seeds 
--
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (1, '1', '1', 'AS63126', 'ambientalDevice1', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (2, '2', '2', 'BD84526', 'ambientalDevice2', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (3, '3', '3', 'CS63126', 'ambientalDevice2', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (4, '4', '4', 'DS63126', 'ambientalDevice3', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (5, '5', '4', 'ES63126', 'ambientalDevice4', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (6, '6', '3', 'FS63126', 'ambientalDevice5', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (7, '6', '2', 'GS63126', 'ambientalDevice6', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (8, '5', '1', 'HS63126', 'ambientalDevice7', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (9, '4', '1', 'IS63126', 'ambientalDevice8', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (10, '3', '2', 'JS63126', 'ambientalDevice9', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (11, '2', '3', 'KS63126', 'ambientalDevice10', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (12, '1', '4', 'LS63126', 'ambientalDevice11', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (13, '1', '4', 'MS63126', 'ambientalDevice12', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (14, '2', '3', 'NS63126', 'ambientalDevice13', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (15, '3', '2', 'OS63126', 'ambientalDevice14', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (16, '4', '1', 'PS63126', 'ambientalDevice15', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (17, '5', '1', 'QS63126', 'ambientalDevice16', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (18, '6', '2', 'RS63126', 'ambientalDevice17', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (19, '6', '3', 'SS63126', 'ambientalDevice18', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (20, '5', '4', 'TS63126', 'ambientalDevice19', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (21, '4', '4', 'US63126', 'ambientalDevice20', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (22, '1', '7', 'AS631261', 'ambientalDevice21', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (23, '2', '7', 'BD845261', 'ambientalDevice22', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (25, '4', '7', 'DS631261', 'ambientalDevice23', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (26, '5', '8', 'ES631261', 'ambientalDevice24', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (27, '6', '8', 'FS631261', 'ambientalDevice25', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (28, '6', '8', 'GS631261', 'ambientalDevice26', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (29, '5', '8', 'HS631261', 'ambientalDevice27', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (30, '4', '8', 'IS631261', 'ambientalDevice28', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (31, '3', '9', 'JS631261', 'ambientalDevice29', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (32, '2', '9', 'KS631261', 'ambientalDevice30', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (33, '1', '9', 'LS631261', 'ambientalDevice31', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (34, '1', '9', 'MS631261', 'ambientalDevice32', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (35, '2', '10', 'NS631261', 'ambientalDevice33', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (36, '3', '10', 'OS631261', 'ambientalDevice34', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (37, '4', '10', 'PS631261', 'ambientalDevice35', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (38, '5', '11', 'QS631261', 'ambientalDevice36', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (39, '6', '11', 'RS631261', 'ambientalDevice37', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (40, '6', '12', 'SS631261', 'ambientalDevice38', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (41, '5', '12', 'TS631261', 'ambientalDevice39', '');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (42, '4', '12', 'US631261', 'ambientalDevice40', '1');
INSERT INTO `sensor` (`id`, `sensor_type_id`, `device_id`, `device_eui`, `name`, `status`) VALUES (24, '3', '7', 'CS631261', 'ambientalDevice41', '1');

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
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (1, '2', '1');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (2, '2', '2');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (3, '3', '3');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (4, '3', '4');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (5, '2', '5');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (6, '2', '6');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (7, '3', '7');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (8, '3', '8');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (9, '2', '9');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (10, '2', '10');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (11, '3', '11');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (12, '3', '11');