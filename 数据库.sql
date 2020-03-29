/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : boke

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2020-03-29 21:31:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_login
-- ----------------------------
DROP TABLE IF EXISTS `admin_login`;
CREATE TABLE `admin_login` (
  `admin_user_id` int(10) NOT NULL AUTO_INCREMENT,
  `admin_account` varchar(20) NOT NULL COMMENT '登录账号',
  `admin_password` varchar(20) NOT NULL COMMENT '登录密码',
  `admin_login_time` datetime NOT NULL COMMENT '登录时间',
  PRIMARY KEY (`admin_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_login
-- ----------------------------
INSERT INTO `admin_login` VALUES ('1', '3212', '212', '2020-03-17 13:20:37');

-- ----------------------------
-- Table structure for admin_register
-- ----------------------------
DROP TABLE IF EXISTS `admin_register`;
CREATE TABLE `admin_register` (
  `admin_user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `admin_user_account` varchar(20) NOT NULL COMMENT '账号',
  `admin_user_password` varchar(20) NOT NULL COMMENT '密码',
  `admin_user_register_time` datetime NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`admin_user_id`),
  UNIQUE KEY `account` (`admin_user_account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_register
-- ----------------------------
INSERT INTO `admin_register` VALUES ('20', '12341231', '123123123a', '2020-03-14 14:57:30');
INSERT INTO `admin_register` VALUES ('21', '123sa', 'wqsasa11', '2020-03-14 14:58:34');
INSERT INTO `admin_register` VALUES ('22', '123saa', 'wqsasa11', '2020-03-14 14:58:59');
INSERT INTO `admin_register` VALUES ('23', '1231211', 'wqsasa11', '2020-03-14 15:11:05');
INSERT INTO `admin_register` VALUES ('24', '1231aaa', 'wqsasa11', '2020-03-14 15:14:51');
INSERT INTO `admin_register` VALUES ('25', '1231aa22', 'wqsasa11', '2020-03-14 22:14:34');
INSERT INTO `admin_register` VALUES ('28', '1231aa2', 'wqsasa11', '2020-03-14 22:15:07');
INSERT INTO `admin_register` VALUES ('29', '1212', '2121', '2020-02-02 00:00:00');
INSERT INTO `admin_register` VALUES ('30', '3212', 'abcdef', '2020-02-01 00:00:00');
INSERT INTO `admin_register` VALUES ('32', '123456', 'aB1234', '2020-03-21 21:57:24');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `wenzhang_id` int(10) NOT NULL COMMENT '文章的id',
  `comment_content` varchar(200) NOT NULL COMMENT '评论的内容',
  `comment_name` varchar(255) NOT NULL COMMENT '一级评论名',
  `comment_time` datetime NOT NULL COMMENT '评论的时间',
  `parent_id` int(10) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `评论和文章绑定` (`wenzhang_id`),
  CONSTRAINT `评论和文章绑定` FOREIGN KEY (`wenzhang_id`) REFERENCES `wenzhang` (`wenzhang_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('15', '3', '这是一级评论', '呵呵', '2020-03-19 15:02:24', '0');
INSERT INTO `comments` VALUES ('16', '3', '这是一级评论2', '咳咳', '2020-03-19 15:02:47', '0');
INSERT INTO `comments` VALUES ('17', '3', '这是二级评论', '哈哈', '2020-03-19 15:03:31', '15');
INSERT INTO `comments` VALUES ('18', '3', '这是二级评论', '可靠', '2020-03-19 15:03:53', '15');
INSERT INTO `comments` VALUES ('19', '4', '这是一级评论3', '哈鸡儿', '2020-03-19 15:16:56', '0');
INSERT INTO `comments` VALUES ('22', '3', '飒飒的', '哈哈', '2020-03-20 15:50:03', '0');
INSERT INTO `comments` VALUES ('23', '3', '飒飒的', '哈哈', '2020-03-20 15:50:06', '0');
INSERT INTO `comments` VALUES ('24', '3', '飒飒的', '哈哈', '2020-03-20 15:50:06', '0');
INSERT INTO `comments` VALUES ('25', '3', '飒飒的', '哈哈', '2020-03-20 15:50:07', '0');
INSERT INTO `comments` VALUES ('26', '3', '飒飒的', '哈哈', '2020-03-20 15:50:08', '0');
INSERT INTO `comments` VALUES ('27', '3', '飒飒的', '哈哈', '2020-03-20 15:50:08', '0');
INSERT INTO `comments` VALUES ('28', '3', '飒飒的', '哈哈', '2020-03-20 15:50:08', '0');
INSERT INTO `comments` VALUES ('29', '3', '飒飒的', '哈哈', '2020-03-20 15:50:09', '0');
INSERT INTO `comments` VALUES ('30', '3', '飒飒的', '哈哈', '2020-03-20 15:50:09', '0');
INSERT INTO `comments` VALUES ('31', '3', '飒飒的', '哈哈', '2020-03-20 15:50:10', '0');
INSERT INTO `comments` VALUES ('32', '3', '飒飒的', '哈哈', '2020-03-20 15:50:10', '0');

-- ----------------------------
-- Table structure for fangwen
-- ----------------------------
DROP TABLE IF EXISTS `fangwen`;
CREATE TABLE `fangwen` (
  `fangwen_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `youke_ip` varchar(20) NOT NULL COMMENT '游客的ip',
  `wenzhang_id` varchar(20) NOT NULL COMMENT '文章id',
  `youke_click` varchar(20) NOT NULL DEFAULT '0' COMMENT '游客在文章上点赞',
  PRIMARY KEY (`fangwen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fangwen
-- ----------------------------
INSERT INTO `fangwen` VALUES ('14', '1', '3', '1');
INSERT INTO `fangwen` VALUES ('15', '1', '3', '0');
INSERT INTO `fangwen` VALUES ('16', '1', '3', '0');
INSERT INTO `fangwen` VALUES ('17', '1', '3', '0');
INSERT INTO `fangwen` VALUES ('18', '1', '3', '0');
INSERT INTO `fangwen` VALUES ('19', '1', '3', '0');
INSERT INTO `fangwen` VALUES ('20', '1', '3', '0');
INSERT INTO `fangwen` VALUES ('21', '1', '4', '0');
INSERT INTO `fangwen` VALUES ('22', '1', '4', '0');
INSERT INTO `fangwen` VALUES ('23', '1', '4', '0');
INSERT INTO `fangwen` VALUES ('24', '1', '4', '0');
INSERT INTO `fangwen` VALUES ('25', '1', '4', '0');
INSERT INTO `fangwen` VALUES ('26', '1', '5', '0');
INSERT INTO `fangwen` VALUES ('27', '1', '4', '0');
INSERT INTO `fangwen` VALUES ('29', '1', '5', '0');
INSERT INTO `fangwen` VALUES ('30', '1', '3', '0');

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `img_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `img_url` varchar(50) NOT NULL COMMENT '图片的url地址',
  `img_add_time` datetime NOT NULL,
  `img_position` varchar(20) NOT NULL COMMENT '图片的位置',
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of images
-- ----------------------------
INSERT INTO `images` VALUES ('3', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:14:30', 'left');
INSERT INTO `images` VALUES ('4', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:14:31', 'left');
INSERT INTO `images` VALUES ('6', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:14:46', 'left');
INSERT INTO `images` VALUES ('7', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:14:52', 'left');
INSERT INTO `images` VALUES ('8', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:51', 'left');
INSERT INTO `images` VALUES ('9', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:51', 'left');
INSERT INTO `images` VALUES ('10', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:52', 'left');
INSERT INTO `images` VALUES ('11', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:58', 'left');
INSERT INTO `images` VALUES ('12', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:58', 'left');
INSERT INTO `images` VALUES ('13', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:59', 'left');
INSERT INTO `images` VALUES ('14', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:39:59', 'left');
INSERT INTO `images` VALUES ('15', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:40:01', 'right');
INSERT INTO `images` VALUES ('16', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:40:01', 'right');
INSERT INTO `images` VALUES ('17', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:40:02', 'bottom');
INSERT INTO `images` VALUES ('18', 'http://czy2020.xyz/image/a.jpg', '2020-03-15 22:40:02', 'top');
INSERT INTO `images` VALUES ('19', 'http://czy2020.xyz/image/a.jpg', '2020-03-20 14:58:59', 'top');

-- ----------------------------
-- Table structure for user_name
-- ----------------------------
DROP TABLE IF EXISTS `user_name`;
CREATE TABLE `user_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `comment_name` varchar(255) NOT NULL COMMENT '评论名字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_name
-- ----------------------------
INSERT INTO `user_name` VALUES ('4', 'aa');
INSERT INTO `user_name` VALUES ('5', 'aa1');
INSERT INTO `user_name` VALUES ('6', 'ss');
INSERT INTO `user_name` VALUES ('7', 'ssa');
INSERT INTO `user_name` VALUES ('8', '泽阳');

-- ----------------------------
-- Table structure for wenzhang
-- ----------------------------
DROP TABLE IF EXISTS `wenzhang`;
CREATE TABLE `wenzhang` (
  `wenzhang_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `wenzhang_title` varchar(50) NOT NULL COMMENT '文章标题',
  `wenzhang_content` text NOT NULL COMMENT '文章的内容',
  `wenzhang_content_html` text NOT NULL COMMENT '文章的html内容',
  `wenzhang_create_time` datetime NOT NULL COMMENT '文章的创建时间',
  `wenzhang_change_time` datetime NOT NULL COMMENT '文章的修改时间',
  `wenzhang_youke_ip_num` int(20) NOT NULL DEFAULT '0' COMMENT '游客的浏览量',
  `wenzhang_youke_click_num` int(20) NOT NULL DEFAULT '0' COMMENT '文章的点赞数',
  `wenzhang_sort` varchar(20) NOT NULL COMMENT '文章的分类',
  PRIMARY KEY (`wenzhang_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wenzhang
-- ----------------------------
INSERT INTO `wenzhang` VALUES ('3', '我是陈a', '这是内', '<p>这是html内容!</p>', '2020-03-14 23:50:40', '2020-03-14 23:50:40', '8', '23', 'javascript');
INSERT INTO `wenzhang` VALUES ('4', '这是文章修改标题', '这是文章修改的内容', '<h1>这是html内容</h1>', '2020-03-14 23:50:40', '2020-03-19 22:20:56', '49', '4', 'javascript');
INSERT INTO `wenzhang` VALUES ('5', '我是陈a', '这是内', '<p>这是html内容!</p>', '2020-03-14 23:50:41', '2020-03-14 23:50:41', '25', '2', 'Html');
INSERT INTO `wenzhang` VALUES ('6', '我是陈a', '这是内', '<p>这是html内容!</p>', '2020-03-14 23:50:42', '2020-03-15 09:08:11', '11', '21', 'Html');
INSERT INTO `wenzhang` VALUES ('7', '我是陈泽阳', '这是内容', '<p>这是html内容!</p>', '2020-03-14 23:50:43', '2020-03-14 23:50:43', '34', '211', 'javascript');
INSERT INTO `wenzhang` VALUES ('8', '我是陈泽阳', '这是内容', '<p>这是html内容!</p>', '2020-03-14 23:50:43', '2020-03-14 23:50:43', '21', '11', 'javascript');
INSERT INTO `wenzhang` VALUES ('9', '我是陈泽阳', '这是内容', '<p>这是html内容!</p>', '2020-03-14 23:50:44', '2020-03-14 23:50:44', '32', '12', 'javascript');
INSERT INTO `wenzhang` VALUES ('13', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:39', '2020-03-20 16:09:39', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('14', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:41', '2020-03-20 16:09:41', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('15', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:42', '2020-03-20 16:09:42', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('16', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:43', '2020-03-20 16:09:43', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('17', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:44', '2020-03-20 16:09:44', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('18', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:44', '2020-03-20 16:09:44', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('19', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:45', '2020-03-20 16:09:45', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('20', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:45', '2020-03-20 16:09:45', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('21', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:46', '2020-03-20 16:09:46', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('22', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:46', '2020-03-20 16:09:46', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('23', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:47', '2020-03-20 16:09:47', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('24', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:47', '2020-03-20 16:09:47', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('25', '如何学习css', '这是css的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:09:47', '2020-03-20 16:09:47', '0', '0', 'css');
INSERT INTO `wenzhang` VALUES ('26', '如何学习vue', '这是vue的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:22', '2020-03-20 16:10:22', '0', '0', 'vue');
INSERT INTO `wenzhang` VALUES ('27', '如何学习vue', '这是vue的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:25', '2020-03-20 16:10:25', '0', '0', 'vue');
INSERT INTO `wenzhang` VALUES ('28', '如何学习vue', '这是vue的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:29', '2020-03-20 16:10:29', '0', '0', 'vue');
INSERT INTO `wenzhang` VALUES ('29', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:51', '2020-03-20 16:10:51', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('30', '如何学习node1', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:51', '2020-03-20 16:15:51', '0', '0', 'node1');
INSERT INTO `wenzhang` VALUES ('31', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:52', '2020-03-20 16:10:52', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('32', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:54', '2020-03-20 16:10:54', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('33', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:54', '2020-03-20 16:10:54', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('34', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:55', '2020-03-20 16:10:55', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('35', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:55', '2020-03-20 16:10:55', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('36', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:56', '2020-03-20 16:10:56', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('37', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:56', '2020-03-20 16:10:56', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('38', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:57', '2020-03-20 16:10:57', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('39', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:58', '2020-03-20 16:10:58', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('40', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:58', '2020-03-20 16:10:58', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('41', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:59', '2020-03-20 16:10:59', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('42', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:10:59', '2020-03-20 16:10:59', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('43', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:11:00', '2020-03-20 16:11:00', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('44', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:11:00', '2020-03-20 16:11:00', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('45', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:11:01', '2020-03-20 16:11:01', '0', '0', 'node');
INSERT INTO `wenzhang` VALUES ('46', '如何学习node', '这是node的内容', '<h1>哈哈哈<h1>', '2020-03-20 16:11:01', '2020-03-20 16:11:01', '0', '0', 'node');

-- ----------------------------
-- Table structure for wenzhang_caogao
-- ----------------------------
DROP TABLE IF EXISTS `wenzhang_caogao`;
CREATE TABLE `wenzhang_caogao` (
  `wenzhang_caogao_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `wenzhang_caogao_title` varchar(50) NOT NULL COMMENT '文章草稿标题',
  `wenzhang_caogao_content` text NOT NULL COMMENT '文章草稿内容',
  `wenzhang_caogao_content_html` text NOT NULL COMMENT '文章草稿html内容',
  `wenzhang_caogao_create_time` datetime NOT NULL COMMENT '文章草稿创建时间',
  `wenzhang_caogao_change_time` datetime NOT NULL COMMENT '文章草稿修改时间',
  PRIMARY KEY (`wenzhang_caogao_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wenzhang_caogao
-- ----------------------------
INSERT INTO `wenzhang_caogao` VALUES ('1', '我是更新草稿标题', '我是更新草稿内容', '我是更新的html草稿内容', '2020-03-15 22:59:52', '2020-03-15 22:59:52');
INSERT INTO `wenzhang_caogao` VALUES ('2', '我是更新草稿标题2', '我是更新草稿内容的3-16', '我是更新的html草稿内容2', '2020-03-15 23:00:47', '2020-03-16 12:31:16');
INSERT INTO `wenzhang_caogao` VALUES ('3', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-15 23:01:07', '2020-03-15 23:01:07');
INSERT INTO `wenzhang_caogao` VALUES ('4', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:07', '2020-03-16 10:23:07');
INSERT INTO `wenzhang_caogao` VALUES ('5', '我是更新草稿标题2', '我是更新草稿内容的3-16', '我是更新的html草稿内容2', '2020-03-16 10:23:09', '2020-03-16 12:31:21');
INSERT INTO `wenzhang_caogao` VALUES ('6', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:10', '2020-03-16 10:23:10');
INSERT INTO `wenzhang_caogao` VALUES ('7', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:11', '2020-03-16 10:23:11');
INSERT INTO `wenzhang_caogao` VALUES ('8', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:12', '2020-03-16 10:23:12');
INSERT INTO `wenzhang_caogao` VALUES ('9', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:13', '2020-03-16 10:23:13');
INSERT INTO `wenzhang_caogao` VALUES ('10', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:16', '2020-03-16 10:23:16');
INSERT INTO `wenzhang_caogao` VALUES ('11', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:16', '2020-03-16 10:23:16');
INSERT INTO `wenzhang_caogao` VALUES ('12', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:17', '2020-03-16 10:23:17');
INSERT INTO `wenzhang_caogao` VALUES ('13', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:18', '2020-03-16 10:23:18');
INSERT INTO `wenzhang_caogao` VALUES ('14', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:18', '2020-03-16 10:23:18');
INSERT INTO `wenzhang_caogao` VALUES ('15', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:20', '2020-03-16 10:23:20');
INSERT INTO `wenzhang_caogao` VALUES ('16', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:21', '2020-03-16 10:23:21');
INSERT INTO `wenzhang_caogao` VALUES ('17', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:22', '2020-03-16 10:23:22');
INSERT INTO `wenzhang_caogao` VALUES ('18', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:23', '2020-03-16 10:23:23');
INSERT INTO `wenzhang_caogao` VALUES ('19', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:23', '2020-03-16 10:23:23');
INSERT INTO `wenzhang_caogao` VALUES ('20', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:24', '2020-03-16 10:23:24');
INSERT INTO `wenzhang_caogao` VALUES ('21', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:24', '2020-03-16 10:23:24');
INSERT INTO `wenzhang_caogao` VALUES ('22', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:25', '2020-03-16 10:23:25');
INSERT INTO `wenzhang_caogao` VALUES ('23', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:25', '2020-03-16 10:23:25');
INSERT INTO `wenzhang_caogao` VALUES ('24', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:26', '2020-03-16 10:23:26');
INSERT INTO `wenzhang_caogao` VALUES ('25', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:26', '2020-03-16 10:23:26');
INSERT INTO `wenzhang_caogao` VALUES ('26', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:27', '2020-03-16 10:23:27');
INSERT INTO `wenzhang_caogao` VALUES ('27', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:27', '2020-03-16 10:23:27');
INSERT INTO `wenzhang_caogao` VALUES ('28', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:28', '2020-03-16 10:23:28');
INSERT INTO `wenzhang_caogao` VALUES ('29', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:28', '2020-03-16 10:23:28');
INSERT INTO `wenzhang_caogao` VALUES ('30', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:29', '2020-03-16 10:23:29');
INSERT INTO `wenzhang_caogao` VALUES ('31', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:29', '2020-03-16 10:23:29');
INSERT INTO `wenzhang_caogao` VALUES ('32', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:30', '2020-03-16 10:23:30');
INSERT INTO `wenzhang_caogao` VALUES ('33', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:30', '2020-03-16 10:23:30');
INSERT INTO `wenzhang_caogao` VALUES ('34', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:31', '2020-03-16 10:23:31');
INSERT INTO `wenzhang_caogao` VALUES ('35', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:31', '2020-03-16 10:23:31');
INSERT INTO `wenzhang_caogao` VALUES ('36', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:32', '2020-03-16 10:23:32');
INSERT INTO `wenzhang_caogao` VALUES ('37', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:32', '2020-03-16 10:23:32');
INSERT INTO `wenzhang_caogao` VALUES ('38', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:33', '2020-03-16 10:23:33');
INSERT INTO `wenzhang_caogao` VALUES ('39', '我是文章草稿的标题', '我是文章草稿的内容', '<div>我是文章草稿的html内容<p>我是p标签</p></div>', '2020-03-16 10:23:33', '2020-03-16 10:23:33');
INSERT INTO `wenzhang_caogao` VALUES ('40', '这是草稿标题', '这是内容', '<h1>as</h1>', '2020-03-16 10:23:33', '2020-03-20 16:22:34');
INSERT INTO `wenzhang_caogao` VALUES ('41', '这是草稿标题', '这是内容', '<h1>as</h1>', '2020-03-20 16:20:37', '2020-03-20 16:20:37');

-- ----------------------------
-- Table structure for youke
-- ----------------------------
DROP TABLE IF EXISTS `youke`;
CREATE TABLE `youke` (
  `youke_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `youke_ip` varchar(20) NOT NULL COMMENT '游客的ip',
  `youke_looktime` datetime NOT NULL COMMENT '游客访问的时间',
  PRIMARY KEY (`youke_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of youke
-- ----------------------------
INSERT INTO `youke` VALUES ('16', '1', '2020-03-16 21:41:38');
INSERT INTO `youke` VALUES ('17', '1', '2020-03-16 21:50:36');
INSERT INTO `youke` VALUES ('18', '1', '2020-03-16 22:22:13');
INSERT INTO `youke` VALUES ('19', '1', '2020-03-16 22:23:14');
INSERT INTO `youke` VALUES ('20', '1', '2020-03-16 22:24:14');
INSERT INTO `youke` VALUES ('21', '1', '2020-03-16 22:24:43');
INSERT INTO `youke` VALUES ('22', '1', '2020-03-16 22:26:17');
INSERT INTO `youke` VALUES ('23', '1', '2020-03-16 22:27:22');
INSERT INTO `youke` VALUES ('24', '1', '2020-03-16 22:29:39');
INSERT INTO `youke` VALUES ('25', '1', '2020-03-16 22:35:25');
INSERT INTO `youke` VALUES ('26', '1', '2020-03-16 22:37:33');
INSERT INTO `youke` VALUES ('27', '1', '2020-03-16 22:37:47');
INSERT INTO `youke` VALUES ('28', '1', '2020-03-16 22:39:03');
INSERT INTO `youke` VALUES ('29', '1', '2020-03-16 22:39:22');
INSERT INTO `youke` VALUES ('30', '1', '2020-03-16 22:39:52');
INSERT INTO `youke` VALUES ('31', '1', '2020-03-16 22:40:06');
INSERT INTO `youke` VALUES ('32', '1', '2020-03-16 22:40:50');
INSERT INTO `youke` VALUES ('33', '1', '2020-03-16 22:48:02');
INSERT INTO `youke` VALUES ('34', '1', '2020-03-16 22:54:38');
