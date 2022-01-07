drop table `material`;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL COMMENT '编码',
  `name` varchar(64) DEFAULT NULL COMMENT '名称',
  `key` varchar(20) DEFAULT NULL COMMENT '关键字',
  `unit` varchar(20) DEFAULT NULL COMMENT '单位',
  `factor` float DEFAULT NULL COMMENT '统计系数', -- 合计数量，计算金额使用
  `type_id` int(11) DEFAULT NULL COMMENT '类型id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8