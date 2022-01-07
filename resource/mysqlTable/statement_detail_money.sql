drop table `statement_detail_money`;
CREATE TABLE `statement_detail_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement_id` INT(11) NOT NULL COMMENT '结算单id',
  `date` DATE DEFAULT NULL COMMENT '日期',
  `type` int(11) DEFAULT NULL COMMENT '类型', -- 1 支出 2 收入 3 本期结余
  `money` double DEFAULT NULL COMMENT '金额',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8