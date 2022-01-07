drop table `statement_snapshot_price`;
CREATE TABLE `statement_snapshot_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement_id` INT(11) NOT NULL COMMENT '结算单id',
  `material_type_id` int(11) DEFAULT NULL COMMENT '材料类型id',
  `price` float DEFAULT NULL COMMENT '单价',
  `trans_weight_factor` float DEFAULT NULL COMMENT '单位转吨系数',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8