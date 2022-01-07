drop table `statement_detail_material`;
CREATE TABLE `statement_detail_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement_id` INT(11) NOT NULL COMMENT '结算单id',
  `date` DATE DEFAULT NULL COMMENT '日期',
  `type` INT(11) DEFAULT NULL COMMENT '类型', -- 1 出库 2 入库 3 本次结余 4 上次结余本期结算
  `material_type_id` int(11) DEFAULT NULL COMMENT '材料类型id',
  `num` double DEFAULT NULL COMMENT '数量',
  `money` double DEFAULT NULL COMMENT '数量',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8