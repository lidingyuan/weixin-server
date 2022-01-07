drop table `order`;
CREATE TABLE `order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `project_id` INT(11) DEFAULT NULL COMMENT '项目id',
  `date` DATE DEFAULT NULL COMMENT '日期',
  `type` INT(11) DEFAULT NULL COMMENT '类型', -- 1 出库单 2 入库单
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  `state` INT(11) DEFAULT NULL COMMENT '状态', -- 0 完成 1 待确认 2 待对方确认 3 撤回 3 撤回待确认 4 撤回待对方确认
  `connect_id` INT(11) DEFAULT NULL COMMENT '关联订单id',
  `statemented` tinyInt(11) DEFAULT 1 COMMENT '是否已结算', -- 0 完成 1 未结算
  `add_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间戳',
  `add_user` INT(11) DEFAULT NULL COMMENT '添加用户id',
  `mod_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间戳',
  `mod_user` INT(11) DEFAULT NULL COMMENT '修改用户id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE INDEX order_project_id_IDX USING BTREE ON rent.`order` (project_id);
