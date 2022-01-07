drop table `material_type`;
CREATE TABLE `material_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `material_type_name` varchar(20) DEFAULT NULL COMMENT '类型',
  `trans_weight_factor` float DEFAULT NULL COMMENT '单位转吨系数',
  `unit` varchar(20) DEFAULT NULL COMMENT '单位',
  `price_rule` INT(11) DEFAULT NULL COMMENT '租金计算规则', -- 0 元/日/吨 1 元/吨
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8