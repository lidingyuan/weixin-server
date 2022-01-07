drop table `stock`;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_comp_id` int(11) NOT NULL COMMENT '用户公司id',
  `material_code` varchar(20) DEFAULT NULL COMMENT '材料code',
  `num` INT(11) DEFAULT NULL COMMENT '数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE rent.stock ADD CONSTRAINT stock_un UNIQUE KEY (user_comp_id,material_code);
