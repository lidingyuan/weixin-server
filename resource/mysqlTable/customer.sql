drop table `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '客户名称',
  `cust_comp_id` int(11) DEFAULT NULL COMMENT '客户公司id', -- 绑定后不可更改
  `user_comp_id` int(11) NOT NULL COMMENT '用户公司id',
  `state` int(11) DEFAULT 1 COMMENT '启用停用', -- 0停用 1启用
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8