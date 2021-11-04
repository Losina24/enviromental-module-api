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
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (1, '15634', '5', 'amb_dev1', '6', '77', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (2, '32532', '5', 'amb_dev2', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (3, '32521', '6', 'amb_dev3', '3', '88', '1');
INSERT INTO `device` (`id`, `device_EUI`, `gateway_id`, `name`, `latitude`, `longitude`, `status`) VALUES (4, '35321', '6', 'amb_dev4', '3', '88', '1');
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
--
-- role seeds
--
INSERT INTO `role` (`id`, `name`) VALUES (1, 'root');
INSERT INTO `role` (`id`, `name`) VALUES (2, 'admin');
INSERT INTO `role` (`id`, `name`) VALUES (3, 'user');
--
-- user seeds
--
INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES (1, '1', '1', 'root', '', '1234', NULL, '617499124', 'email1@hotmail.com', NULL);
INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES (2, '2', '3', 'admin', '', '1234', NULL, '684957124', 'email2@hotmail.com', NULL);
INSERT INTO `user` (`id`, `role_id`, `council_id`, `name`, `surnames`, `password`, `address`, `phone_number`, `email`, `postal_code`) VALUES (3, '3', '3', 'user', '', '1234', NULL, '698721532', 'email3@hotmail.com', NULL);
--
-- user_device seeds
--
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (1, '2', '1');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (2, '2', '2');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (3, '3', '3');
INSERT INTO `user_device` (`id`, `user_id`, `device_id`) VALUES (4, '3', '4');










