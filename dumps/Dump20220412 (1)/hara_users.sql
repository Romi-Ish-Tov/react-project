-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: hara
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `followed_vacations` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (50,'romirom','r@g.com','jcdhfd','customer','fb1247d18f113c1c0c2cca93c17c1d62',0),(51,'ilay ish tov','ilay@gmail.com','ilay','customer','4c88558a6782904a73eae09b99d90102',0),(52,'BBBBBB','BBBBBB@gmail.com','BBBBBB','customer','41ec037239352a15c6edd54a7ab3624a',0),(54,'romi','romi@gmail.com','romi','customer','41ec037239352a15c6edd54a7ab3624a',0),(55,'yoav','yoav@gmail.com','yoav','customer','41ec037239352a15c6edd54a7ab3624a',0),(56,'bla bla','blabla@gmail.com','bla bla ','customer','41ec037239352a15c6edd54a7ab3624a',0),(57,'tttttt','ttt@g.com','tttttt','customer','41ec037239352a15c6edd54a7ab3624a',0),(58,'roni','ro@g.com','roni','customer','41ec037239352a15c6edd54a7ab3624a',0),(59,'yoyo','yoyo@gmail.com','yoyo','customer','41ec037239352a15c6edd54a7ab3624a',0),(60,'twerq','tew@gmail.com','twrqrqrr','customer','41ec037239352a15c6edd54a7ab3624a',0),(61,'twerq','ytytytyt@gmail.com','ytytytyt','customer','41ec037239352a15c6edd54a7ab3624a',0),(62,'rororororo','rororororo@gmail.com','rororororo','customer','41ec037239352a15c6edd54a7ab3624a',0),(63,'rororororo','rorororforo@gmail.com','asnofasoifd','customer','41ec037239352a15c6edd54a7ab3624a',0),(64,'rororsororo','rorororsforo@gmail.com','asnofsasoifd','customer','41ec037239352a15c6edd54a7ab3624a',0),(68,'admin','admin@gmail.com','admin','admin','41ec037239352a15c6edd54a7ab3624a',0),(69,'yoavnonono','riq@g.com','riqqq','customer','41ec037239352a15c6edd54a7ab3624a',0),(70,'hara','hara@kaki.com','hara','customer','41ec037239352a15c6edd54a7ab3624a',0),(71,'lola','lola@gmail.com','lola','customer','41ec037239352a15c6edd54a7ab3624a',0),(72,'rororghjgsuororo','rororovjhcxvrgsforo@gmail.com','asnofcjvgxjhsasoifd','customer','41ec037239352a15c6edd54a7ab3624a',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-12 14:05:47
