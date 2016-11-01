/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MariaDB
 Source Server Version : 100118
 Source Host           : localhost
 Source Database       : thesis

 Target Server Type    : MariaDB
 Target Server Version : 100118
 File Encoding         : utf-8

 Date: 10/31/2016 21:42:50 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `reaction`
-- ----------------------------
DROP TABLE IF EXISTS `reaction`;
CREATE TABLE `reaction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(11) unsigned NOT NULL,
  `testNumber` bigint(11) DEFAULT NULL,
  `testAreaStartTime` bigint(20) DEFAULT NULL,
  `testAreaInterval` bigint(20) DEFAULT NULL,
  `testAreaWidth` double DEFAULT NULL,
  `testAreaHeight` double DEFAULT NULL,
  `subjectEndTime` bigint(20) DEFAULT NULL,
  `reactionTime` double DEFAULT NULL,
  `triggerStartAt` bigint(20) DEFAULT NULL,
  `triggerEndAt` bigint(20) DEFAULT NULL,
  `triggerColor` varchar(255) DEFAULT NULL,
  `triggerPosition` varchar(255) DEFAULT NULL,
  `triggerInterval` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `age` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `discipline` varchar(255) DEFAULT NULL,
  `vision` varchar(255) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `IP` varchar(255) DEFAULT NULL,
  `report` varchar(255) DEFAULT NULL,
  `isNoticed` varchar(255) DEFAULT NULL,
  `noticeNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
