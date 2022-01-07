drop table `order_project_count`;
CREATE TABLE `order_project_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL COMMENT '项目id',
  `user_comp_id` int(11) NOT NULL COMMENT '用户公司id',
  `material_code` varchar(20) DEFAULT NULL COMMENT '材料code',
  `num` INT(11) DEFAULT NULL COMMENT '数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE rent.order_project_count ADD CONSTRAINT order_project_count_un UNIQUE KEY (project_id,user_comp_id,material_code);

CREATE INDEX order_project_count_project_id_IDX USING BTREE ON rent.order_project_count (project_id);
