drop table `statement_bind_order`;
CREATE TABLE `statement_bind_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement_id` INT(11) DEFAULT NULL COMMENT '结算单id',
  `order_id` INT(11) DEFAULT NULL COMMENT '订单id',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8