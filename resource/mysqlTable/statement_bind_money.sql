drop table `statement_bind_money`;
CREATE TABLE `statement_bind_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement_id` INT(11) DEFAULT NULL COMMENT '结算单id',
  `money_id` INT(11) DEFAULT NULL COMMENT '转账id',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8