drop table `project_price`;
CREATE TABLE `project_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `material_type_id` int(11) DEFAULT NULL COMMENT '材料类型id',
  `price` float DEFAULT NULL COMMENT '日租金',
  `trans_weight_factor` float DEFAULT NULL COMMENT '单位转吨系数',
  `user_comp_id` INT(11) NOT NULL COMMENT '用户公司id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE rent.project_price ADD CONSTRAINT project_price_un UNIQUE KEY (project_id,material_type_id);
