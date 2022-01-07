drop table `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '项目名称',
  `customer_id` int(11) NOT NULL COMMENT '客户id',
  `cust_comp_id` int(11) DEFAULT NULL COMMENT '客户公司id',
  `user_comp_id` int(11) NOT NULL COMMENT '用户公司id',
  `statement_id` int(11) DEFAULT NULL COMMENT '结算单id',
  `state` int(11) DEFAULT 1 COMMENT '启用停用', -- 0停用 1启用
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8