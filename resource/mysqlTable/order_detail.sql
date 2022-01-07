drop table `order_detail`;
CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL COMMENT '订单id',
  `material_code` varchar(20) DEFAULT NULL COMMENT '材料code',
  `num` INT(11) DEFAULT NULL COMMENT '数量',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE INDEX order_detail_order_id_IDX USING BTREE ON rent.order_detail (order_id);
