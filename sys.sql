/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : sys

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 30/01/2019 10:02:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for depart
-- ----------------------------
DROP TABLE IF EXISTS `depart`;
CREATE TABLE `depart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyUser` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `parentId` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `buttonKey` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `controllerIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `enabled` tinyint(2) DEFAULT NULL,
  `iconPath` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `isAuth` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `isButton` tinyint(2) DEFAULT NULL,
  `parentId` int(10) DEFAULT NULL,
  `url` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menu_locale
-- ----------------------------
DROP TABLE IF EXISTS `menu_locale`;
CREATE TABLE `menu_locale`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `enabled` tinyint(2) DEFAULT NULL,
  `locale` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `menuId` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  `modifyUser` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `enabled` tinyint(2) DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `menuId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyUser` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for staff_depart
-- ----------------------------
DROP TABLE IF EXISTS `staff_depart`;
CREATE TABLE `staff_depart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departId` int(10) DEFAULT NULL,
  `staffId` int(10) DEFAULT NULL,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for staff_role
-- ----------------------------
DROP TABLE IF EXISTS `staff_role`;
CREATE TABLE `staff_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staffId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `modifyTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `modifyUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
