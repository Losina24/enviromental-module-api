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